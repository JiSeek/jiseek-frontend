import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  LoadingDot,
  LoadingCircle,
  NoResultGif,
  HeartFull,
} from '../../assets/images/images';
import { getLocaleDate } from '../../utils';

const Posts = ({
  status,
  bestPosts,
  posts,
  boards: { fetchNextPage, isFetchingNextPage, hasNextPage },
}) => {
  const [target, setTarget] = useState(null);
  const { i18n } = useTranslation();

  const onIntersect = useCallback(
    ([entry], observer) => {
      if (hasNextPage && entry.isIntersecting && !isFetchingNextPage) {
        observer.unobserve(entry.target);
        fetchNextPage();
        observer.observe(entry.target);
      }
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.3 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, onIntersect]);

  return (
    <div>
      {status === 'loading' && (
        <img src={LoadingCircle} alt="Posts loading..." />
      )}
      {status === 'error' && (
        <img src={NoResultGif} alt="Failed to load Posts" />
      )}
      {status === 'success' && (
        <GridContainer>
          {Object.values(bestPosts).map(({ id, photo, count, created }) => (
            <Link key={`best-post-${id}`} to={`./post/${id}`}>
              <div>
                <img src={photo} alt={`Best post ${id}`} />
              </div>
              {/* 임시 */}
              <div>
                <span>
                  <img src={HeartFull} alt="dislike" />
                  {count}
                </span>
                <span>{`생성일: ${getLocaleDate(
                  created,
                  i18n.language,
                )}`}</span>
              </div>
            </Link>
          ))}
          {posts.pages.map(({ results }) =>
            results.map(({ id, photo, count, created }) => (
              <Link key={`post-${id}`} to={`./post/${id}`}>
                <div>
                  <img src={photo} alt={`post ${id}`} />
                </div>
                {/* 임시 */}
                <div>
                  <span>
                    <img src={HeartFull} alt="dislike" />
                    {count}
                  </span>
                  <span>{`생성일: ${getLocaleDate(
                    created,
                    i18n.language,
                  )}`}</span>
                </div>
              </Link>
            )),
          )}
          <InfiniteScroll ref={setTarget}>
            {isFetchingNextPage && (
              <img src={LoadingDot} alt="Posts loading..." />
            )}
          </InfiniteScroll>
        </GridContainer>
      )}
    </div>
  );
};

Posts.propTypes = {
  status: PropTypes.string,
  bestPosts: PropTypes.arrayOf(PropTypes.any),
  posts: PropTypes.objectOf(PropTypes.any),
  boards: PropTypes.objectOf(PropTypes.any),
};

Posts.defaultProps = {
  status: 'idle',
  bestPosts: [],
  posts: {},
  boards: {},
};

const GridContainer = styled.div`
  /* 커뮤니티 미리보기 사진 정렬 */
  margin: auto;
  height: 70vh;
  margin-top: 1.5rem;
  padding-right: 0.75rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.65rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #72af2c95;
    border-radius: 30px;
  }

  > a {
    position: relative;
    display: flex;
    align-items: center;

    :first-child {
      grid-column: 1/3;
      grid-row: 1/3;

      > div:last-child {
        > span {
          font-size: 1.5rem;
        }
      }
    }

    > div:first-child {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      :hover {
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
          transition: all 0.3s cubic-bezier(.25,.8,.25,1);
      }

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        position: absolute;
        :hover {
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 10px 10px rgba(0, 0, 0, 0.22);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }
      }
    }
    > div:last-child {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      text-align: center;
      transition: background, opacity 0.5s ease;
      opacity: 0;

      > span {
        font-size: 1rem;
        color: #fbfbfb;
      }

      :hover {
        background: rgba(0, 0, 0, 0.65);
        opacity: 1;
      }
    }
  }
`;

const InfiniteScroll = styled.div`
  grid-column: 1/6;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;

  > img {
    width: 7rem;
  }
`;

export default Posts;
