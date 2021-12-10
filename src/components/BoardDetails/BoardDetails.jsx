import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuthContext } from '../../contexts';
import jiseekApi from "../../api";
import { boardKeys, userKeys } from "../../constants";
import Comment from './Comment';
import { getLocaleDate } from "../../utils";
import LikeButtonContainer from '../common/LikeButtonContainer';

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
        isSuccess } = useQuery(boardKeys.detailsById(params.id), jiseekApi.get());

    if (isError) {
        toast.warn('게시판 읽어오기 error:', error);
    } else {
        console.log('게시판 읽어오기 성공', details);
    }

    if (isSuccess) {
        console.log('게시판 읽어오기 성공', details);
    }

    
    // 게시판 삭제 기능 (D)
    const deletion = useMutation((id) => (
        jiseekApi.delete(
            `/boards/${id}/`, { 
            token: token.access,
        })
    ), {
        onSuccess: () => {
            toast('삭제 되었습니다'); // 모달
            navigate('/board');
        },
        onError: (er) => toast('삭제 오류', er),
    });    

    const handleDelete = () => {
        if (window.confirm('게시물을 삭제하시겠습니까?')){ // 모달
            console.log('예');
            deletion.mutate(details.id);
        }
        else {
            console.log('아니오');
        }
    }; 


    // 게시판 수정 페이지로 이동
    const handleUpdate = (photo, content) => {
        navigate(
            `/board/modify/${ details.id }`,
            { state: { photo, content }}
        )
    }

    return (
        <div>
        {/* 게시판 상세 정보 */}
            { isLoading ?
                <div>로딩아이콘</div>
                : <>
                    <div>{ details.user.name }</div>

                {/* 사용자와 작성자가 일치할 시, 삭제/수정과 좋아요여부/목록 기능 */}
                    { pk === details.user.pk ?
                        <>  
                            <LikeButtonContainer 
                                type='board' 
                                data={ { pk: Number(details.id), content: details.content, created: details.created } } 
                                like={ details.is_fav }
                            />
                            <div>{ details.like_users }</div>
                            <button type='button' onClick={ () => handleUpdate(details.photo, details.content) }>게시판 수정</button>
                            <button type='button' onClick={ handleDelete }>게시판 삭제</button>
                        </>
                        :
                        null
                    }

                    <img src={ details.photo } alt='이미지'/>
                    <div>{ details.count }</div>
                    <div>{ details.content }</div>
                {/* 게시판 날짜 표시, 수정 여부 */}
                    <div>
                        { getLocaleDate(details.created, 'en') }
                        { details.created.slice(0, 20) !== details.modified.slice(0, 20) ?  
                            <> (수정됨) </> : null
                        }
                    </div>

                {/* 댓글 목록 */}
                    <hr/>
                    <div>댓글 목록</div>
                    <Comment />
                </>
            }
        </div>
    );
}

export default BoardDetails;