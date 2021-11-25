import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { useMutation } from 'react-query';
// 임시
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
// import jiseekApi from '../../api';
// import {useAuth } from '../../contexts'

const LikeContainer = () => {
  // const { token } = useAuthContext();
  // const { mutate } = useMutation(
  //   (token) => jiseekApi.put(`/mypage/${target}/like/${id}`, {token}),
  //   { mutationKey: '' },
  // );
  useEffect(() => console.log('에방'), []);

  return <FontAwesomeIcon icon={faThumbsUp} color="yellow" />;
};

// LikeContainer.propTypes = {
//   target: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };

export default LikeContainer;

// image
