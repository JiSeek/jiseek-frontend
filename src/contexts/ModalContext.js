import React, { createContext, useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import FormLessButton from '../components/common/FormLessButton';

const ModalContext = createContext(null);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error('Use modalContext inside Provider.');
  }
  return modalContext;
};

export const ModalProvider = ({ children }) => {
  const [modalContents, setModalContents] = useState(null);

  const openModal = useCallback((contents) => setModalContents(contents), []);
  const onClose = useCallback(() => setModalContents(null), []);

  return (
    <ModalContext.Provider value={openModal}>
      <StyledModalScrollPrevent modalState={modalContents}>
        {children}
        {modalContents && (
          <ModalRenderer onClose={onClose}>{modalContents}</ModalRenderer>
        )}
      </StyledModalScrollPrevent>
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

ModalProvider.defaultProps = {
  children: null,
};

// TODO: 모달 팝업 시 스크롤 블락킹 처리: 동작X
const StyledModalScrollPrevent = styled.div`
  position: absolute;
  overflow: ${(props) => (props.modalState ? 'hidden' : 'auto')};
  /* overflow-y: hidden; */
`;

const ModalRenderer = ({ onClose, children }) => (
  <StyledModal>
    <StyledModalOverlay onClick={onClose} />
    <StyledModalContents>
      <FormLessButton onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} size="lg" color="#e53935" />
      </FormLessButton>
      <div>{children}</div>
    </StyledModalContents>
  </StyledModal>
);

ModalRenderer.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
};

ModalRenderer.defaultProps = {
  onClose: null,
  children: null,
};

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:10;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const StyledModalContents = styled.div`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  position: relative;
  width: 330px;
  height: 70%;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  border-radius: 20px;

  > button {
    width: fit-content;
    height: fit-content;
    background-color: transparent;
    padding: 5px;
    margin: 15px 15px 10px 15px;
  }

  > div {
    display: flex;
    max-width: 100%;
    margin: 0px 20px 25px 20px;
    text-align: center;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export default ModalContext;
