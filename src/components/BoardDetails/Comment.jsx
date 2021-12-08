import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { boardKeys, userKeys } from '../../constants';
import jiseekApi from '../../api';
import { useAuthContext } from '../../contexts';


function Comment(){
    // const queryClient = useQueryClient();
    const params = useParams();
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    const pk = queryClient.getQueryData(userKeys.info)?.pk;
    const [ text, setText ] = useState('');
    const [ modifiedText, setModifiedText ] = useState('');

 
    // 댓글 조회 기능 (R)
    const { 
        data: comments,
        isSuccess, 
        error } = useQuery(boardKeys.commentsById(params.id), jiseekApi.get());
    
    if (isSuccess) {
        console.log('댓글 조회 성공', comments);
        console.log(Object.values(comments))
    } else {
        console.log('댓글 조회 에러', error);
    }
    

    // 댓글 생성 기능 (C)
    const creation = useMutation(
        (content) => {
            jiseekApi.post(`/boards/${params.id}/comments/`, { 
                token: token.access,
                content })
        },
        {
            onSuccess: (d) => {
                console.log('댓글 생성 성공', d);
                window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
            },
            onError: (e) => console.log('댓글 생성 에러', e)
        }
    )


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
            jiseekApi.delete(
                `/boards/${params.id}/comments/${commentId}/`, {
                token: token.access,
            })
        },
        {
            onSuccess: (d) => {
                console.log('댓글 삭제 성공', d);
                window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
            },
            onError: (e) => console.log('댓글 삭제 에러', e)
        }
    )


    // 댓글 수정 기능 (U)
    const update = useMutation(
        (data) =>
            (
                jiseekApi.put(
                `/boards/${params.id}/comments/${data.id}/`, {
                token: token.access,
                content: data.content
            }))
        ,
        {
            // onMutate: async newContent => {
            //     await queryClient.cancelQueries(boardKeys.commentsById(params.id))
            //     const previousContent = queryClient.getQueryData(boardKeys.commentsById(params.id))
            //     queryClient.setQueryData(boardKeys.commentsById(params.id), old => [old, newContent])
            //     return { previousContent }
            // },
            onSuccess: (d) => { 
                console.log('댓글 수정 성공', d);
                window.location.reload(); // 그 화면 전체 로딩이아니라 댓글만 재로딩 안될까?
            },
            onError: (e) => console.log('댓글 수정 에러', e)
        }
    )


    return (
        <>
        {/* 댓글 리스트 */}
            { comments && Object.values(comments).map((comm) => (
                <div key={ comm.id } >
                    <div>{ comm.user }</div>
                    <div>{ comm.content }</div>
                    <div>{ comm.created }</div>

                {/* 사용자와 작성자가 일치할 시, 수정/삭제 기능 */}
                    { pk === comm.user ?
                        <>
                            <textarea
                                type='text'
                                defaultValue={ comm.content }
                                onChange={(e) => setModifiedText(e.target.value)}
                            />
                            <button type='button' onClick={() => update.mutate({ id: comm.id, content: modifiedText }) }>댓글 수정하기</button>
                            <button type='button' onClick={() => deletion.mutate(comm.id) }>댓글 삭제</button>
                        </>
                        :
                        null
                    }
                </div>
            ))}
 
        {/* 댓글 입력창 */}
            <form action="#">
                <button type='button' onClick={() => creation.mutate(text) }>댓글 올리기</button>
                <textarea
                    type='text'
                    placeholder='텍스트 입력...'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>
        </>
    );
}


export default Comment;