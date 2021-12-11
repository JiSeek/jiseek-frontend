import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoadingCircle, NoResultGif } from '../../assets/images/images';

const Posts = ({ status, bestPosts, posts }) => (
  <div>
    {status === 'loading' && (
      <img src={LoadingCircle} alt="게시글 로딩 이미지" />
    )}
    {status === 'error' && <img src={NoResultGif} alt="게시글 오류 이미지" />}
    {status === 'success' && (
      <>
        {Object.values(bestPosts).map((post) => (
          <Link key={`best-post-${post.id}`} to={`./post/${post.id}`}>
            <img src={post.photo} alt="베스트 게시글 이미지" />
          </Link>
        ))}
        {Object.values(posts.results).map((post) => (
          <Link key={`post-${post.id}`} to={`./post/${post.id}`}>
            <img src={post.photo} alt="게시글 이미지" />
          </Link>
        ))}
      </>
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

export default Posts;
