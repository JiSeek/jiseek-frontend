import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import jiseekApi from '../../api';
import { boardKeys, userKeys } from '../../constants';
import { useAuthContext, useLangContext, useModalContext } from '../../contexts';
import { getLocaleDate } from '../../utils';


function Comment(){
    // const queryClient = useQueryClient();
    const params = useParams();
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    const pk = queryClient.getQueryData(userKeys.info)?.pk;
    const [ text, setText ] = useState('');
    const [ modifiedText, setModifiedText ] = useState('');
    const [ shownUpdate, setShownUpdate ] = useState();
    const [ lang ] = useLangContext();
    const { t } = useTranslation();
    const modal = useModalContext();

 
    // 댓글 조회 기능 (R)
    const { 
        data: comments,
        isSuccess, 
        error,
    } = useQuery(
        boardKeys.commentsById(params.id), 
        jiseekApi.get(), {
            refetchOnWindowFocus: true,
            staleTime: 600000,
        }
    );
    
    if (isSuccess) {
        console.log('조회 성공', comments);

    } else {
        console.log(t('boardReadErr'), error);
    }


    // 댓글 생성 기능 (C)
    const creation = useMutation(
        (content) => (
            jiseekApi.post(`/boards/${params.id}/comments/`, { 
                token: token.access,
                content })
        ),
        {
            onSuccess: (d) => { 
                toast.success(t('boardCreateSucc'), d);
                setText('');
            },
            onError: (e) => toast.error(t('boardCreateErr'), e),
            onSettled: () => { queryClient.invalidateQueries(boardKeys.detailsById(params.id)) }
        }
    )

    const handleCreate = () => {
        if (!token.access) {
            modal(t('boardRequiredLogin'), 'select', {
                yes: () => navigate('/login'),
                no: () => {},
            })
        } else {
            creation.mutate(text)
        }
    }


    // 댓글 255자로 제한
    useEffect(() => {
        if (text.length > 255) {
            toast.warn(t('boardLimitedText'));
            setText(text.slice(0, 255));
        }
        if (modifiedText.length > 255) {
            toast.warn(t('boardLimitedText'));
            setText(modifiedText.slice(0, 255));
        }
    }, [text, modifiedText, t]);


    // 댓글 삭제 기능 (D)
    const deletion = useMutation(
        (commentId) => 
            jiseekApi.delete(
                `/boards/${params.id}/comments/${commentId}/`, {
                token: token.access })
        ,
        {
            onSuccess: () => toast.success(t('boardDeleteSucc')),
            onError: () => toast.error(t('boardDeleteErr')),
            onSettled: () => { queryClient.invalidateQueries(boardKeys.commentsById(params.id)) }
        }
    )
    
    const handleDelete = (id) => {
        modal(t('boardDeleteNor'), 'select', {
            yes: () => deletion.mutate(id),
            no: () => {} }
        )
    }
    

    // 댓글 수정 기능 (U)
    const update = useMutation(
        (data) => (
            jiseekApi.put(
            `/boards/${params.id}/comments/${data.id}/`, {
                token: token.access,
                content: data.content 
            })
        ),
        {
            // onMutate: async newContent => {
            //     await queryClient.cancelQueries(boardKeys.commentsById(params.id))
            //     const previousContent = queryClient.getQueryData(boardKeys.commentsById(params.id))
            //     queryClient.setQueryData(boardKeys.commentsById(params.id), old => [old, newContent])
            //     return { previousContent }
            // },
            onSuccess: (d) => { 
                setShownUpdate(false);
                toast.success(t('boardUpdateSucc'), d);
            },
            onError: (e) => toast.error(t('boardUpdateErr'), e),
            onSettled: () => { queryClient.invalidateQueries(boardKeys.commentsById(params.id)) }
        }
    )

    const handleUpdate = (id) => {
        if (!modifiedText){
            toast.warn(t('boardUpdateNone'));
        } else {
            update.mutate({ id, content: modifiedText });
        }
    }


    return (
        <>
        {/* 댓글 리스트 */}
            { comments && Object.values(comments).map((comm) => (
                <div key={ comm.id } >
                    <div>{ comm.username }</div>
                    <div>{ comm.content }</div>
                {/* 댓글 날짜 표시, 수정여부 */}
                    <div>
                        { getLocaleDate(comm.created, lang) }
                        { comm.created.slice(0, 20) !== comm.modified.slice(0, 20) ?
                            <> { t('boardBeModified') } </> : null
                        }
                    </div>
                    
                {/* 사용자와 작성자가 일치할 시, 수정/삭제 버튼 */}
                    { pk === comm.user ?
                        <>
                        {/* 수정버튼 클릭한 댓글과 리스트 중의 댓글이 일치할시, 수정 기능 */}
                           { shownUpdate === comm.id ?
                                <>
                                    <textarea
                                        type='text'
                                        defaultValue={ comm.content }
                                        onChange={(e) => setModifiedText(e.target.value)}
                                    />
                                    <button type='button' onClick={() => handleUpdate(comm.id) }>댓글 수정하기</button>
                                    <button type='button' onClick={ () => setShownUpdate() }>댓글 수정 취소</button>
                                </>
                            :
                                <>
                                    <button type='button' onClick={ () => setShownUpdate(comm.id) }>댓글 수정버튼</button>
                                    <button type='button' onClick={ () => handleDelete(comm.id) }>댓글 삭제버튼</button>
                                </>
                            }
                        </>
                        :
                        null
                    }
                </div>
            ))}
 
        {/* 댓글 입력창 */}
            <form action="#">
                <button type='button' onClick={ handleCreate }>댓글 올리기</button>
                <textarea
                    type='text'
                    placeholder={ t('boardPlaceHolder') }
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </form>
        </>
    );
}

export default Comment;