import React from 'react';
import PropTyps from 'prop-types';
import { HeartFull, HeartLine } from '../../assets/images/images';

const LikeButton = ({ like }) =>
  like ? (
    <img src={HeartFull} alt="like" />
  ) : (
    <img src={HeartLine} alt="dislike" />
  );

LikeButton.propTypes = {
  like: PropTyps.bool,
};

LikeButton.defaultProps = {
  like: false,
};

export default LikeButton;
