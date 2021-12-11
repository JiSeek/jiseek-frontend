import styled from 'styled-components';

export const StyledErrorMsg = styled.span`
  color: red;
  font-size: 0.7rem;
  margin-top: 3px;
`;

export const StyledFavContainer = styled.div`
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;

  ::-webkit-scrollbar {
    height: 0.5rem;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #72af2c95;
    border-radius: 30px;
  }

  > div {
    display: flex;
    margin-bottom: 1rem;

    > div {
      margin-right: 0.75rem;
      position: relative;

      :hover {
        > div {
          opacity: 1;

          > span {
            opacity: 1;
          }
        }
      }

      > img {
        width: 25vh;
        max-width: 230px;
        height: 25vh;
        max-height: 230px;
        object-fit: cover;
        border-radius: 1rem;
      }
    }
  }
`;
