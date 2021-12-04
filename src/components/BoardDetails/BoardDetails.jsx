// import React, { useState } from "react";
import React from "react";
// import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMutation, useQuery, } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from '../../contexts';
import jiseekApi from "../../api";
// import { boardKeys, userKeys } from "../../constants";
import { boardKeys } from "../../constants";

function BoardDetails() {
    const { token } = useAuthContext;
    // const queryClient = useQueryClient();
    // const pk = queryClient.getQueryData(userKeys.info)?.pk;
    const navigate = useNavigate();
    const params = useParams();
    // const [ writer, setWriter] = useState(false);
    const { 
        data: boardDetails, 
        isLoading, 
        isError, 
        error, 
        isSuccess } = useQuery(boardKeys.detailsById(params.id), jiseekApi.get());

    if (isError) {
        console.log('error:', error);
    } else {
        console.log('data',boardDetails);
    }

    // if (isSuccess) {
    //     if (pk === boardDetails.user) {
    //         setWriter(true);
    //     }
    // }
    if (isSuccess) {console.log('임시');}

    const mutation = useMutation((id) => {
        jiseekApi.delete(`/boards/${id}`, { token: token.access });
    }, {
        onSuccess: (da) => console.log('성공',da),
        onError: (er) => console.log('오류',er),
    });
    
    // 후에 모달 창으로 바꾸든지 해야되겠다..
    const handleDelete = () => {
        if (!window.confirm('게시물을 삭제하시겠습니까?')){
            console.log('임시') // 임시처리
        }
        else {
            mutation.mutate(params.id);
        }
    }; 

    const handleUpdate = () => {
        navigate('/boards/upload/');
    };

    return (
        <div>
            { isLoading ?
                <div>로딩아이콘</div>
                : <>
                    <div>{ boardDetails.user.name }</div>
                    {/* { writer &&
                        <>
                            <button type='button' onClick={handleUpdate}>수정</button>
                            <button type='button' onClick={handleDelete}>삭제</button>
                        </>
                    } */}
                    <button type='button' onClick={handleUpdate}>수정</button>
                    <button type='button' onClick={handleDelete}>삭제</button>
                    <img src={ boardDetails.photo } alt='이미지'/>
                    <div>{ boardDetails.count }</div>
                    <div>{ boardDetails.content }</div>
                    <div>{ boardDetails.created }</div>
                    {/* { writer &&
                        <>
                            <div>{ boardDetails.is_fav }</div>
                            <div>{ boardDetails.like_users }</div>
                        </>
                    } */}
                </>
            }
            { isError && 
                <div>{error}</div>
            }
        </div>
    );
}

export default BoardDetails;