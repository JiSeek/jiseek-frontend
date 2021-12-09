import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { boardKeys, userKeys } from '../../constants';
import jiseekApi from '../../api';
import { useAuthContext } from '../../contexts';

function Comment() {
  // const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const pk = queryClient.getQueryData(userKeys.info)?.pk;
  const [text, setText] = useState('');
  const [modifiedText, setModifiedText] = useState('');
  const [shownUpdate, setShownUpdate] = useState();

  // 댓글 조회 기능 (R)
  const {
    data: comments,
    isSuccess,
    error,
  } = useQuery(boardKeys.commentsById(params.id), jiseekApi.get());

  if (isSuccess) {
    console.log('댓글 조회 성공', comments);
    console.log(Object.values(comments));
  } else {
    console.log('댓글 조회 에러', error);
  }

  // 댓글 생성 기능 (C)
  const creation = useMutation(
    (content) =>
      jiseekApi.post(`/boards/${params.id}/comments/`, {
        token: token.access,
        content,
      }),
    {
      onSuccess: (d) => {
        console.log('댓글 생성 성공', d);
        window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
      },
      onError: (e) => console.log('댓글 생성 에러', e),
    },
  );

  const handleSubmit = () => {
    creation.mutate(text);

    if (!token.access) {
      if (
        window.confirm(
          '로그인이 필요한 서비스입니다. 로그인페이지로 이동하시겠습니까?',
        )
      ) {
        navigate('/login');
      } else {
        console.log('로그인 페이지 이동 취소');
      }
    }
  };

  // 댓글 255자로 제한
  useEffect(() => {
    if (text.length > 255) {
      setText(text.slice(0, 255));
    }
    if (modifiedText.length > 255) {
      setText(modifiedText.slice(0, 255));
    }
  }, [text, modifiedText]);

  // 댓글 삭제 기능 (D)
  const deletion = useMutation(
    (commentId) => {
      jiseekApi.delete(`/boards/${params.id}/comments/${commentId}/`, {
        token: token.access,
      });
    },
    {
      onMutate: (d) => console.log('aaaaaaaa', d),
      onSuccess: (d) => {
        console.log('댓글 삭제 성공', d);
        window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
      },
      onError: (e) => console.log('댓글 삭제 에러', e),
      onSettled: () => {
        queryClient.invalidateQueries(boardKeys.commentsById(params.id));
      },
    },
  );

  const handleDelete = (id) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      // 모달
      deletion.mutate(id);
    } else {
      console.log('댓글삭제 취소');
    }
  };

  // 댓글 수정 기능 (U)
  const update = useMutation(
    (data) =>
      jiseekApi.put(`/boards/${params.id}/comments/${data.id}/`, {
        token: token.access,
        content: data.content,
      }),
    {
      // onMutate: async newContent => {
      //     await queryClient.cancelQueries(boardKeys.commentsById(params.id))
      //     const previousContent = queryClient.getQueryData(boardKeys.commentsById(params.id))
      //     queryClient.setQueryData(boardKeys.commentsById(params.id), old => [old, newContent])
      //     return { previousContent }
      // },
      onSuccess: (d) => {
        setShownUpdate(false);
        console.log('댓글 수정 성공', d);
        window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
      },
      onError: (e) => console.log('댓글 수정 에러', e),
    },
  );

  const handleUpdate = (id) => {
    setShownUpdate(id);
  };

  return (
    <>
      {/* 댓글 리스트 */}
      {comments &&
        Object.values(comments).map((comm) => (
          <div key={comm.id}>
            <div>{comm.username}</div>
            <div>{comm.content}</div>
            <div>{comm.created}</div>

            {/* 사용자와 작성자가 일치할 시, 수정/삭제 버튼 */}
            {pk === comm.user ? (
              <>
                {/* 수정버튼 클릭한 댓글과 리스트 중의 댓글이 일치할시, 수정 기능 */}
                {shownUpdate === comm.id ? (
                  <>
                    <textarea
                      type="text"
                      defaultValue={comm.content}
                      onChange={(e) => setModifiedText(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        update.mutate({ id: comm.id, content: modifiedText })
                      }
                    >
                      댓글 수정하기
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" onClick={() => handleUpdate(comm.id)}>
                      댓글 수정버튼
                    </button>
                    <button type="button" onClick={() => handleDelete(comm.id)}>
                      댓글 삭제버튼
                    </button>
                  </>
                )}
              </>
            ) : null}
          </div>
        ))}

      {/* 댓글 입력창 */}
      <form action="#">
        <button type="button" onClick={handleSubmit}>
          댓글 올리기
        </button>
        <textarea
          type="text"
          placeholder="텍스트 입력..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </>

    //     <div>
    //     {/* 댓글 리스트 */}
    //     <CommentTitle>댓글</CommentTitle>
    //         { comments && Object.values(comments).map((comm) => (
    //             <div key={ comm.id } >
    //                 <div>{ comm.username }</div>
    //                 <div>{ comm.content }</div>
    //                 <div>{ comm.created }</div>

    //             {/* 사용자와 작성자가 일치할 시, 수정/삭제 버튼 */}
    //                 { pk === comm.user ?
    //                     <>
    //                     {/* 수정버튼 클릭한 댓글과 리스트 중의 댓글이 일치할시, 수정 기능 */}
    //                        { shownUpdate === comm.id ?
    //                             <>
    //                                 <textarea
    //                                     type='text'
    //                                     defaultValue={ comm.content }
    //                                     onChange={(e) => setModifiedText(e.target.value)}
    //                                 />
    //                                 <button type='button' onClick={() => update.mutate({ id: comm.id, content: modifiedText }) }>댓글 수정하기</button>
    //                             </>
    //                         :
    //                             <>
    //                                 <button type='button' onClick={ () => handleUpdate(comm.id) }>댓글 수정버튼</button>
    //                                 <button type='button' onClick={ () => handleDelete(comm.id) }>댓글 삭제버튼</button>
    //                             </>
    //                         }
    //                     </>
    //                     :
    //                     null
    //                 }
    //             </div>
    //         ))}

    //     {/* 댓글 입력창 */}
    //         <form action="#">
    //             <button type='button' onClick={ handleSubmit }>댓글 올리기</button>
    //             <textarea
    //                 type='text'
    //                 placeholder='텍스트 입력...'
    //                 value={text}
    //                 onChange={(e) => setText(e.target.value)}
    //             />
    //           )}
    //           <DateAndButtons>
    //             <p>
    //               {comm.created.slice(0, 10)} {comm.created.slice(11, 16)}
    //             </p>
    //             {pk === comm.user ? (
    //               <div>
    //                 <button
    //                   type="button"
    //                   onClick={() =>
    //                     update.mutate(
    //                       { id: comm.id, content: modifiedText },
    //                       setChanging(!changing),
    //                     )
    //                   }
    //                 >
    //                   수정
    //                 </button>
    //                 <button
    //                   type="button"
    //                   onClick={() => deletion.mutate(comm.id)}
    //                 >
    //                   삭제
    //                 </button>
    //               </div>
    //             ) : null}
    //           </DateAndButtons>
    //         </EachComment>
    //       ))}
    //   </CommentContainer>
    //   <StyledHr />
    //   {/* 댓글 입력창 */}
    //   <form action="#">
    //     <CommentArea
    //       type="text"
    //       placeholder="댓글"
    //       value={text}
    //       onChange={(e) => setText(e.target.value)}
    //     />
    //     <button type="button" onClick={() => creation.mutate(text)}>
    //       댓글 올리기
    //     </button>
    //   </form>
    // </div>
  );
}

// const CommentTitle = styled.div`
//   font-size: 0.95rem;
//   display: flex;
//   flex-basis: 100%;
//   align-items: center;
//   color: #00110080;
//   margin: 1rem 0;

//   ::before,
//   ::after {
//     content: '';
//     flex-grow: 1;
//     background: #00110036;
//     height: 1px;
//   }

//   ::before {
//     margin-right: 1rem;
//   }
//   ::after {
//     margin-left: 1rem;
//   }
// `;

// const CommentContainer = styled.ul`
//   height: 20vh;
//   overflow-y: auto;
// `;

// const EachComment = styled.li`
//   margin-bottom: 1rem;

//   > p {
//     :first-child {
//       font-weight: 700;
//     }
//   }
// `;

// const CommentContent = styled.p`
//   word-break: keep-all;
//   overflow-wrap: anywhere;
//   margin: 0.45rem 0;
// `;

// const StyledHr = styled.hr`
//   border: 0.5px solid #2341233e;
// `;

// const CommentArea = styled.textarea`
//   margin: 0.65rem 0;
//   height: 1.2rem;
//   font-family: inherit;
//   border: none;
//   border-bottom: 2px solid #c1dda0;
//   width: 100%;
//   background: #fbfbfb;
//   resize: none;
//   outline: none;

//   :focus {
//     transition: 0.3s;
//     box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
//       rgb(0 0 0 / 19%) 0px 1px 2px 0px;
//   }
// `;

// const DateAndButtons = styled.div`
//   display: flex;
//   justify-content: space-between;

//   > div {
//     color: #355f42;
//     > button {
//       font-size: 0.85rem;
//       border: none;
//       background: none;
//       cursor: pointer;

//       :last-child {
//         border-left: 1px solid;
//       }
//     }
//   }
// `;

export default Comment;
