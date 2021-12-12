import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LoadingCircle, NoResultGif } from '../../assets/images/images';

const Posts = ({ status, bestPosts, posts }) => (
  <div>
    {status === 'loading' && (
      <img src={LoadingCircle} alt="게시글 로딩 이미지" />
    )}
    {status === 'error' && <img src={NoResultGif} alt="게시글 오류 이미지" />}
    {status === 'success' && (
      <GridContainer>
        {Object.values(bestPosts).map((post) => (
          <Link key={`best-post-${post.id}`} to={`./post/${post.id}`}>
            <div>
              <img src={post.photo} alt="베스트 게시글 이미지" />
            </div>
          </Link>
        ))}
        {Object.values(posts.results).map((post) => (
          <Link key={`post-${post.id}`} to={`./post/${post.id}`}>
            <div>
              <img src={post.photo} alt="게시글 이미지" />
            </div>
          </Link>
        ))}
      </GridContainer>
    )}
  </div>
);

Posts.propTypes = {
  status: PropTypes.string,
  bestPosts: PropTypes.arrayOf(PropTypes.any),
  posts: PropTypes.objectOf(PropTypes.any),
};

Posts.defaultProps = {
  status: 'idle',
  bestPosts: [],
  posts: {},
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
    :first-child {
      grid-column: 1/3;
      grid-row: 1/3;
    }

    > div {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        position: absolute;
      }
    }
  }
`;

export default Posts;
