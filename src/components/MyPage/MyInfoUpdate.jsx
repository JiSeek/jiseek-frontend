import React from 'react';
import PropTypes, { oneOfType, object, func } from 'prop-types';
import { StyledErrorMsg } from '../common';

// TODO: 이미지 프리뷰 처리
const MyInfoUpdate = ({ hookForm, imgUrl, onImgUpload, lockSubmit }) => {
  console.log(lockSubmit, 'lock');
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <form onSubmit={hookForm.onSubmit}>
      <img src={imgUrl} alt="프로필 사진" />
      <label htmlFor="avatar">
        프로필 사진을 선택하세요.
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={onImgUpload}
        />
      </label>
      <label htmlFor="user-name">
        닉네임:
        <input type="text" id="user-name" {...hookForm.register('name')} />
      </label>
      <StyledErrorMsg>
        {hookForm.errors.name && hookForm.errors.name.message}
      </StyledErrorMsg>
      <button disabled={lockSubmit} type="submit">
        수정
      </button>
    </form>
  );
};

MyInfoUpdate.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  imgUrl: PropTypes.string,
  onImgUpload: PropTypes.func,
  lockSubmit: PropTypes.bool,
};

MyInfoUpdate.defaultProps = {
  imgUrl: '',
  onImgUpload: null,
  lockSubmit: false,
};

export default MyInfoUpdate;
