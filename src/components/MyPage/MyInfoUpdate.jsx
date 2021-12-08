import React, { useState } from 'react';
import PropTypes, { oneOfType, object, func } from 'prop-types';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

// TODO: 이미지 프리뷰 처리
const MyInfoUpdate = ({ hookForm, isSubmitting }) => {
  const url = hookForm.watch('image');
  const abc = url || [];
  const [imageUrl, setImageUrl] = useState('');
  if (abc.length !== 0) {
    const reader = new FileReader();

    reader.readAsDataURL(abc[0]);
    reader.onload = (event) => setImageUrl(event.target.result);
    console.log(abc[0], imageUrl);
  }
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <UpdateInfo>
      <form onSubmit={hookForm.onSubmit}>
        <ProfileImage src={imageUrl} alt="프로필 사진" />
        <FileLabel htmlFor="avatar">
          {/* Choose a profile picture: */}
          사진 선택
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            {...hookForm.register('image')}
          />
        </FileLabel>
        <StyledErrorMsg>
          {hookForm.errors.image && hookForm.errors.image.message}
        </StyledErrorMsg>
        <label htmlFor="user-name">
          <input type="text" id="user-name" {...hookForm.register('name')} />
        </label>
        <StyledErrorMsg>
          {hookForm.errors.name && hookForm.errors.name.message}
        </StyledErrorMsg>
        <StyledButton disabled={isSubmitting} type="submit">
          수정
        </StyledButton>
      </form>
    </UpdateInfo>
  );
};

MyInfoUpdate.propTypes = {
  hookForm: PropTypes.objectOf(oneOfType([func, object])).isRequired,
  isSubmitting: PropTypes.bool,
};

MyInfoUpdate.defaultProps = {
  isSubmitting: false,
};

const UpdateInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 40px;

  > form {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */

    > label > input {
      font-family: inherit;
      border: none;
      border-bottom: 2px solid #8cc748;
      /* padding: 0.5rem 0 0.3rem 0; */
      width: 196px;
      background: #fbfbfb;
      text-align: center;

      ::placeholder {
        color: #789180;
      }

      :focus {
        transition: 0.3s;
        box-shadow: rgb(0 0 0 / 13%) 0px 1px 3px 0px,
          rgb(0 0 0 / 19%) 0px 1px 2px 0px;
      }

      :first-child {
        margin-top: 0;
      }
    }
  }
`;

const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
`;

const FileLabel = styled.label`
  font-size: 0.8rem;
  background-color: #c1dda0;
  text-align: center;
  padding: 0.35rem 0;
  margin: 1rem 0;
  width: 100%;
  cursor: pointer;

  > input {
    display: none;
  }
`;

const StyledButton = styled.button`
  font-size: 0.9rem;
  background-color: #407f00;
  color: #f6fff2;
  text-align: center;
  width: 100%;
  height: 30px;
  cursor: pointer;
  border: none;
  margin-top: 0.5rem;
`;
export default MyInfoUpdate;
