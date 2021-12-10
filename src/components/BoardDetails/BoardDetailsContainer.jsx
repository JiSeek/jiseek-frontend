import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuthContext, useLangContext, useModalContext } from '../../contexts';
import jiseekApi from "../../api";
import { boardKeys, userKeys } from "../../constants";
import { getLocaleDate } from "../../utils";
import LikeButtonContainer from '../common/LikeButtonContainer';


function BoardDetailsContainer() {
    const { token } = useAuthContext();
    const queryClient = useQueryClient();
    const pk = queryClient.getQueryData(userKeys.info)?.pk;
    const navigate = useNavigate();
    const params = useParams();
    const [ lang ] = useLangContext();
    const { t } = useTranslation();
    const modal = useModalContext();
    

    // 게시판 조회 기능 (R)
    const { 
        data: details, 
        isLoading, 
        isError, 
        error 
    } = useQuery(
            boardKeys.detailsById(params.id), 
            jiseekApi.get(), { 
                refetchOnWindowFocus: true,
                staleTime: 600000,
            }
        );

    if (isError) {
        console.log(t('boardReadErr'), error);
    } else {
        console.log('게시판 읽어오기 성공', details);
    }

    
    // 게시판 삭제 기능 (D)
    const deletion = useMutation(
        (id) => (
            jiseekApi.delete(
                `/boards/${id}/`, { 
                token: token.access,
            }
        )
    ), {
        onSuccess: () => {
            toast.success(t('boardDeleteSucc'));
            navigate('/board');
        },
        onError: (er) => toast.error(t('boardDeleteErr'), er),
    });    

    const handleDelete = () => {
        modal('게시물을 삭제하시겠습니까?', 'select', { 
            yes: () => deletion.mutate(details.id),
            no: () => {},
        })
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
                        { getLocaleDate(details.created, lang) }
                        { details.created.slice(0, 20) !== details.modified.slice(0, 20) ?  
                            <> { t('boardBeModified') } </> : null
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default BoardDetailsContainer;