import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import jiseekApi from '../../api';
import { myPagekeys } from '../../constants';
import { useAuthContext, useModalContext } from '../../contexts';
import { LikeButton } from '../common';
// import { useLangContext } from '../../contexts';

const FavoriteFoodContainer = () => {
  // const [lang] = useLangContext();
  const openModal = useModalContext();
  const { token } = useAuthContext();
  const { data, isLoading, isError } = useQuery(
    myPagekeys.favFood,
    jiseekApi.get({ token: token.access }),
    { staleTime: Infinity },
  );

  // TODO: 임시 무지성 코딩
  const onClick = useCallback(() => openModal('test'), [openModal]);

  // TODO: 프레젠테이셔널 분리해야댐
  return (
    <div>
      {isLoading || isError ? (
        <div>기다려</div>
      ) : (
        <div style={{ display: 'flex' }}>
          {data.map(({ pk, name, image }) => (
            <div key={pk}>
              <ul>
                <li>{pk}</li>
                <li>{name}</li>
                <li>{image}</li>
                <button value={pk} onClick={onClick} type="button">
                  상세정보 보기
                </button>
              </ul>
              <LikeButton
                type="food"
                id={Number(pk)}
                data={{ id: pk, name, image }}
                like
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteFoodContainer;
