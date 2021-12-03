import React from 'react';
import PropTypes, { oneOfType, object, func } from 'prop-types';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

// TODO: 이미지 프리뷰 처리
const MyInfoForm = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
    <input type="image" src={hookForm.watch('image')} alt="프로필 사진" />
    <label htmlFor="avatar">
      {/* Choose a profile picture: */}
      프로필 사진을 선택하세요.
      <StyledInput
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onDrop={(e) => {
          e.preventDefault();
          console.log('drop', e.target);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          console.log('over', e.target);
        }}
        onDragLeave={(e) => console.log('leave', e)}
        {...hookForm.register('image')}
      />
    </label>
    <StyledErrorMsg>
      {hookForm.errors.image && hookForm.errors.image.message}
    </StyledErrorMsg>
    <label htmlFor="user-name">
      닉네임:
      <input type="text" id="user-name" {...hookForm.register('name')} />
    </label>
    <StyledErrorMsg>
      {hookForm.errors.name && hookForm.errors.name.message}
    </StyledErrorMsg>
    <button disabled={isSubmitting} type="submit">
      수정
    </button>
  </form>
);

MyInfoForm.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

MyInfoForm.defaultProps = {
  isSubmitting: false,
};

const StyledInput = styled.input`
  width: 150px;
  height: 150px;
  background-color: black;
`;

export default MyInfoForm;
