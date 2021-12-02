import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import jiseekApi from "../../api";
import { boardKeys } from "../../constants";
import { useAuthContext } from "../../contexts";

// ***props값 이렇게 받아올 수 있나?***
function BoardDetails({ board_id }) {
    const { token } = useAuthContext;
    const navigate = useNavigate();
    const [isLogged, setBeLogged] = useState(false);
    const { data, isLoading, isError, error, isSuccess} = useQuery(boardKeys.detailsById, jiseekApi.get({ board_id }));
    
    // ***프론트에서 현재 로그인한 유저아이디를 알아낼 방법이 있나?***
    if (isSuccess) {
        if (token === data.user_id) {
            setBeLogged(true);
        }
    }

    const mutation = useMutation(() => {
        jiseekApi.delete({ board_id }); // ***check***
    },{
        onSuccess: () => navigate('/board'),
    });
    
    // 후에 모달 창으로 바꾸든지 해야되겠다..
    const handleDelete = () => {
        if (!confirm('게시물을 삭제하시겠습니까?')){

        }
        else {
            mutation.mutate(board_id);
        }
    }; 

    const handleUpdate = () => {
        navigate('/board/upload');
    };

    return (
        <div>
            { isLoading ? (
                <div>로딩아이콘</div>
                ) : isError ? (
                    <div>{ error }</div>
                    ) : ( <>
                        <div>{ data.user_id }</div>
                        { isLogged &&
                            <>
                                <button type='button' onClick={handleUpdate}>수정</button>
                                <button type='button' onClick={handleDelete}>삭제</button>
                            </>
                        }
                        <img src={ data.photo } alt='이미지'/>
                        <div>{ data.count }</div>
                        <div>{ data.content }</div>
                        <div>{ created_at }</div>
                        <div>{ modified_at }</div>
                    </> )
            }
        </div>
    );
}

BoardDetails.propTypes = {
    board_id : PropTypes.number.isRequired,
};

export default BoardDetails;