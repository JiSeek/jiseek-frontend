import React from 'react';
import PropTypes, { oneOfType, object, func } from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledErrorMsg } from '../common';

const MyInfoUpdate = ({ hookForm, imgUrl, onImgUpload, lockSubmit }) => {
  const { t } = useTranslation();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <UpdateInfo onSubmit={hookForm.onSubmit}>
      <div>
        <ProfileImage src={imgUrl} alt={t('myPageMyInfoProfile')} />
        <FileLabel htmlFor="avatar">
          {t('myPageMyInfoProfileSelect')}
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            {...hookForm.register('image', { onChange: onImgUpload })}
          />
        </FileLabel>
        <NameLabel htmlFor="user-name">
          <input type="text" id="user-name" {...hookForm.register('name')} />
        </NameLabel>
        <StyledErrorMsg>
          {hookForm.errors.name && hookForm.errors.name.message}
        </StyledErrorMsg>
      </div>
      <StyledBtnContainer>
        <Link to="..">{t('myPageMyInfoCancelBtn')}</Link>
        <button disabled={lockSubmit} type="submit">
          {t('myPageMyInfoUpdateBtn')}
        </button>
      </StyledBtnContainer>
    </UpdateInfo>
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

const UpdateInfo = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
  padding: 60px 40px;
  height: 53vh;
  max-height: 480px;
  > div:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 330px;
    margin-top: 20px;
  }
`;

const ProfileImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
`;

const FileLabel = styled.label`
  width: 100%;
  padding: 0.5rem 0;
  border-radius: 5px;
  text-align: center;
  font-size: 0.8rem;
  background-color: #92ce4d;
  color: #f6fff2;
  cursor: pointer;

  > input {
    display: none;
  }
`;

const NameLabel = styled.label`
  > input {
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
`;

const StyledBtnContainer = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  > button,
  a {
    width: 48%;
    height: 100%;
    border: none;
    margin-top: 0.5rem;
    border-radius: 5px;
    background-color: #407f00;
    color: #f6fff2;
    font-size: 0.9rem;
    cursor: pointer;

    :disabled {
      background-color: #3f7f00a0;
      cursor: not-allowed;
    }
  }
`;

export default MyInfoUpdate;
