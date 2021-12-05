import React from 'react';
import PropTypes, { oneOfType, object, func } from 'prop-types';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

// TODO: 이미지 프리뷰 처리
const MyInfoUpdate = ({ hookForm, isSubmitting }) => (
  /* eslint-disable react/jsx-props-no-spreading */
  <form onSubmit={hookForm.onSubmit}>
    <input type="image" src={hookForm.watch('image')} alt="프로필 사진" />
    <label htmlFor="avatar">
      {/* Choose a profile picture: */}
      프로필 사진을 선택하세요.
      <div
        style={{ width: '100px', height: '100px', backgroundColor: 'red' }}
        onDrop={(e) => {
          // if (e.target.tagName !== 'DIV') {
          //   console.log('퉷1');
          //   return;
          // }
          e.preventDefault();
          e.stopPropagation();
          const { files } = e.dataTransfer;
          console.log(files);
          console.log(
            'drop',
            e,
            e.target.files,
            e.dataTransfer,
            e.originalEvent?.dataTransfer,
          );
        }}
      />
      <StyledInput
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onDrop={(e) => {
          if (e.target.tagName !== 'INPUT') {
            console.log('퉷1');
            return;
          }
          e.preventDefault();
          console.log(
            'drop',
            e,
            e.target.files,
            e.dataTransfer,
            e.originalEvent?.dataTransfer,
          );
        }}
        onDragOver={(e) => {
          if (e.target.tagName !== 'INPUT') {
            console.log('퉷2');
            return;
          }
          e.preventDefault();
          console.log('over');
        }}
        onDragLeave={(e) => {
          if (e.target.tagName !== 'INPUT') {
            console.log('퉷3');
            return;
          }
          console.log('leave');
        }}
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

MyInfoUpdate.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

MyInfoUpdate.defaultProps = {
  isSubmitting: false,
};

const StyledInput = styled.input`
  width: 150px;
  height: 150px;
  background-color: black;
`;

export default MyInfoUpdate;
