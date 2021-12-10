import React from 'react';
import PropTyps from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ like }) => (
  <FontAwesomeIcon icon={faHeart} size="2x" color={like ? '#FE3A31' : 'gray'} />
);

LikeButton.propTypes = {
  like: PropTyps.bool,
};

LikeButton.defaultProps = {
  like: false,
};

export default LikeButton;
