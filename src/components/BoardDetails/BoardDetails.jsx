import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import jiseekApi from "../../api";
import { boardKeys } from "../../constants";
import { useAuthContext } from "../../contexts";

// ***props값 이렇게 받아올 수 있나?***
function BoardDetails({ boardId }) {
    const { token } = useAuthContext;
    const navigate = useNavigate();
    const [isLogged, setBeLogged] = useState(false);
    const { data, isLoading, isError, error, isSuccess} = useQuery(boardKeys.detailsById, jiseekApi.get({ boardId }));
    
    // ***프론트에서 현재 로그인한 유저아이디를 알아낼 방법이 있나?***
    if (isSuccess) {
        if (token === data.userId) {
            setBeLogged(true);
        }
    }

    const mutation = useMutation(() => {
        jiseekApi.delete({ boardId }); // ***check***
    },{
        onSuccess: () => navigate('/board'),
    });
    
    // 후에 모달 창으로 바꾸든지 해야되겠다..
    const handleDelete = () => {
        if (!window.confirm('게시물을 삭제하시겠습니까?')){
            console.log('임시') // 임시처리
        }
        else {
            mutation.mutate(boardId);
        }
    }; 

    const handleUpdate = () => {
        navigate('/board/upload');
    };

    return (
        <div>
            { isLoading ?
                <div>로딩아이콘</div>
                : <>
                        <div>{ data.userId }</div>
                        { isLogged &&
                            <>
                                <button type='button' onClick={handleUpdate}>수정</button>
                                <button type='button' onClick={handleDelete}>삭제</button>
                            </>
                        }
                        <img src={ data.photo } alt='이미지'/>
                        <div>{ data.count }</div>
                        <div>{ data.content }</div>
                        <div>{ data.created_at }</div>
                    </>
            }
            { isError && 
                <>{error}</>
            }
        </div>
    );
}

BoardDetails.propTypes = {
    boardId : PropTypes.number.isRequired,
};

export default BoardDetails;