import React from 'react';
import PropTyps from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ like }) => (
  <FontAwesomeIcon icon={faThumbsUp} color={like ? 'red' : 'auto'} />
);

LikeButton.propTypes = {
  like: PropTyps.bool,
};

LikeButton.defaultProps = {
  like: false,
};

export default LikeButton;
