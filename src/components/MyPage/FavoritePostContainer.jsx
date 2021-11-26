import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import jiseekApi from '../../api';
import { myPagekeys } from '../../constants';
import { useLangContext, useAuthContext } from '../../contexts';
import { getLocaleDate } from '../../utils';
import { LikeButton } from '../common';

const FavoritePostContainer = () => {
  const [lang] = useLangContext();
  const { token } = useAuthContext();
  const { data, isLoading, isError } = useQuery(
    myPagekeys.favPost,
    jiseekApi.get({ token: token.access }),
    { staleTime: Infinity },
  );

  // const location = useLocation();
  // console.log('마이페이지', location);

  return (
    <div>
      {isLoading || isError ? (
        <div>기다려</div>
      ) : (
        <div style={{ display: 'flex' }}>
          {data.map(({ pk, created, content }) => (
            <div key={pk}>
              <ul>
                <li>{pk}</li>
                <li>{getLocaleDate(created, lang)}</li>
                <li>{content}</li>
                <Link to={`/board/${pk}`}>게시글 가기</Link>
              </ul>
              <LikeButton
                key={`board${pk}`}
                type="board"
                id={Number(pk)}
                data={{ id: pk, content, created_at: created }}
                initState
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePostContainer;
