import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
// 임시
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import jiseekApi from '../../api';

const LikeContainer = ({ target, id }) => {
  const { mutate } = useMutation(
    () => jiseekApi.put(`/mypage/${target}/like/${id}`),
    { mutationKey: '' },
  );

  return <FontAwesomeIcon icon={faThumbsUp} color="yellow" />;
};

Favorite.propTypes = {
  target: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default LikeContainer;

// image
