import React from "react";
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
    const isLogged = False;
    const { data, isLoading, isError, error, isSuccess} = useQuery(boardKeys.detailsById, jiseekApi.get({ board_id }));
    
    // ***프론트에서 현재 로그인한 유저아이디를 알아낼 방법이 있나?***
    if (isSuccess) {
        if (token === data.user_id) {
            isLogged = True;
        }
    }

    const mutation = useMutation(() => {
        jiseekApi.delete({ board_id }); // ***check***
    },{
        onSuccess: () => navigate('/board'),
    });
    
    const handleDelete = () => {
        alert('게시물을 삭제하시겠습니까?');
        // ***if yes***
        mutation.mutate(board_id);
    }; 

    const handleUpdate = () => {
        navigate('/board/upload');
    };

    return (
        <>
            { isLoading ?
                <div>로딩아이콘</div>
                : isError ?
                    <div>{ error }</div>
                    : <>
                        <div>{ data.user_id }</div>
                        { isLogged &&
                            <>
                                <button type='button' onClick={handleUpdate}>수정</button>
                                <button type='button' onClick={handleDelete}>삭제</button>
                            </>
                        }
                        <img>{ data.photo }</img>
                        <div>{ data.count }</div>
                        <div>{ data.content }</div>
                        <div>{ created_at }</div>
                        <div>{ modified_at }</div>
                    </>
            }
        </>
    );
}

BoardDetails.propTypes = {
    board_id : PropTypes.number.isRequired,
};

export default BoardDetails;