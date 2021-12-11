import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes, { any, func } from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FormLessButton from '../components/common/FormLessButton';

const ModalContext = createContext(null);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error('Use modalContext inside Provider.');
  }
  return modalContext;
};

// Valid Type: 'message', 'select', 'alarm'(default)
export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState('alarm');
  const [modalContents, setModalContents] = useState(null);
  const [selectFunc, setSelectFunc] = useState({ yes: null, no: null });

  const openModal = useCallback((contents, type = 'alarm', execFunc) => {
    setModalType(type);
    setModalContents(contents);
    if (type === 'select' && typeof execFunc === 'object') {
      setSelectFunc(execFunc);
    }
  }, []);

  const onClose = useCallback(() => {
    setModalType('alarm');
    setModalContents(null);
    setSelectFunc({ yes: null, no: null });
  }, []);

  return (
    <ModalContext.Provider value={openModal}>
      {children}
      {modalContents && (
        <ModalRenderer
          type={modalType}
          selectFunc={selectFunc}
          onClose={onClose}
        >
          {modalContents}
        </ModalRenderer>
      )}
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

const ModalRenderer = ({ type, selectFunc, onClose, children }) => (
  <StyledModal>
    <StyledModalOverlay onClick={type === 'message' ? onClose : null} />
    {type === 'alarm' && (
      <StyledAlarmModal>
        {children}
        <button type="button" onClick={onClose}>
          확인
        </button>
      </StyledAlarmModal>
    )}
    {type === 'select' && (
      <StyledSelectModal>
        {children}
        {typeof selectFunc.yes === 'function' && (
          <button
            type="button"
            onClick={() => {
              selectFunc.yes();
              onClose();
            }}
          >
            확인
          </button>
        )}
        {typeof selectFunc.no === 'function' && (
          <button
            type="button"
            onClick={() => {
              selectFunc.no();
              onClose();
            }}
          >
            취소
          </button>
        )}
      </StyledSelectModal>
    )}
    {type === 'message' && (
      <StyledMessageModal>
        <FormLessButton onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} size="lg" color="#e53935" />
        </FormLessButton>
        <div>{children}</div>
      </StyledMessageModal>
    )}
  </StyledModal>
);

ModalRenderer.propTypes = {
  type: PropTypes.string,
  selectFunc: PropTypes.objectOf(func),
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([any]),
};

ModalRenderer.defaultProps = {
  type: 'alarm',
  selectFunc: { yes: null, no: null },
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
  z-index: 10;
`;

const StyledModalOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalCommon = css`
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  background-color: #f9f9f9;
  border-radius: 20px;
  position: relative;
`;

const StyledAlarmModal = styled.div`
  ${ModalCommon}
  width: 330px;
  height: 200px;
`;

const StyledSelectModal = styled.div`
  ${ModalCommon}
  width: 330px;
  height: 200px;
`;

const StyledMessageModal = styled.div`
  ${ModalCommon}
  width: 50vw;
  max-width: 660px;
  max-height: 70vh;
  display: flex;
  flex-direction: column;

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
    margin: 0px 0 3rem 0;
    padding: 0px 4rem 0 4rem;
    text-align: center;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 0.4vw;
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #72af2c95;
      border-radius: 30px;
    }

    /* ::-webkit-scrollbar-thumb {
      background:red;
    } */
    /* -ms-overflow-style: none;
    scrollbar-width: none; */
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export default ModalContext;
