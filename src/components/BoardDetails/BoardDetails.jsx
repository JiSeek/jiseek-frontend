import React from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
import jiseekApi from '../../api';
import { boardKeys, userKeys } from '../../constants';
import Comment from './Comment';

function BoardDetails() {
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const pk = queryClient.getQueryData(userKeys.info)?.pk;
  const navigate = useNavigate();
  const params = useParams();

  // 게시판 조회 기능 (R)
  const {
    data: details,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery(boardKeys.detailsById(params.id), jiseekApi.get());

  if (isError) {
    console.log('게시판 읽어오기 error:', error);
  } else {
    console.log('게시판 읽어오기 data', details);
  }

  if (isSuccess) {
    if (pk === details.user.pk) {
      console.log('pk===data.user.pk');
    } else {
      console.log('pk', pk);
      console.log('data.user', details.user.pk);
    }
  }

  // 게시판 삭제 기능 (D)
  const deletion = useMutation(
    (id) => {
      jiseekApi.delete(`/boards/${id}/`, {
        token: token.access,
      });
    },
    {
      onSuccess: () => {
        alert('삭제 되었습니다'); // 모달
        navigate('/board');
      },
      onError: (er) => console.log('삭제오류', er),
    },
  );

  const handleDelete = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      // 모달
      console.log('예');
      deletion.mutate(params.id);
    } else {
      console.log('아니오');
    }
  };

  // 게시판 수정 페이지로 이동
  const handleUpdate = (photo, content) => {
    // navigate(
    //     `/board/modify/${ params.id }`,
    //     { state: { photo, content }}
    // )
    console.log(photo, content); // 임시
  };

  return (
    <section>
      {/* 게시판 상세 정보 */}
      {isLoading ? (
        <div>로딩아이콘</div>
      ) : (
        <BoardDetailContainer>
          <img src={details.photo} alt="이미지" />
          <div>
            <BoardDetailContents>
              <li>
                <span>{details.user.name}</span>

                {/* 사용자와 작성자가 일치할 시, 삭제/수정과 좋아요여부/목록 기능 */}
                {pk === details.user.pk ? (
                  <span>
                    <button
                      type="button"
                      onClick={handleUpdate(details.photo, details.content)}
                    >
                      수정
                    </button>
                    <button type="button" onClick={handleDelete}>
                      삭제
                    </button>
                  </span>
                ) : null}
              </li>
              <li>{details.content}</li>
              <li>{details.created}</li>
              <li>
                isfav{details.is_fav} {details.count}
              </li>
            </BoardDetailContents>
            {/* 댓글 목록 */}
            <Comment />
          </div>
        </BoardDetailContainer>
      )}
    </section>
  );
}

const BoardDetailContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1.5rem;

  > img {
    height: 70vh;
    width: 70vh;
    max-height: 650px;
    max-width: 650px;
    object-fit: cover;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const BoardDetailContents = styled.ul`
  padding: 0.15rem 0;
  display: grid;
  grid-template-rows: auto 1fr auto auto;

  > li {
    margin-bottom: 0.75rem;

    :first-child {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    > span {
      :first-child {
        font-size: 1.2rem;
        font-weight: 500;
      }
      > button {
        border: none;
        background: none;
        color: #355f42;
        cursor: pointer;

        :last-child {
          border-left: 1px solid;
        }
      }
    }
  }
`;

export default BoardDetails;
