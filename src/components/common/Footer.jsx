import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import {
  FooterLogo,
  FooterGithub,
  FooterGitlab,
  FooterYoutube,
} from '../../assets/images/images';

const Footer = ({ moveTop }) => (
  <FooterBackground>
    <input type="image" onClick={moveTop} src={FooterLogo} alt="Footer Logo" />
    <FooterContents>
      <li>
        <span>지식</span>知食
      </li>
      <li>
        <Link to="member">고예림, 고정현, 김지훈, 박지윤, 이민영, 전진성</Link>
      </li>
      <li>
        image2jiseek@gmail.com
        <a href="mailto:image2jiseek@gmail.com">
          <MdEmail />
        </a>
      </li>
      <li>
        <a href="https://github.com/JiSeek" target="_blank" rel="noreferrer">
          <img src={FooterGithub} alt="Jiseek Github Link" />
        </a>
        <a
          href="https://kdt-gitlab.elice.io/002-part3-cnn/team2"
          target="_blank"
          rel="noreferrer"
        >
          <img src={FooterGitlab} alt="Jiseek Gitlab Link" />
        </a>
        <a href="https://www.youtube.com/watch?v=A59Jaa7CKYk" target="_blank" rel="noreferrer">
          <img src={FooterYoutube} alt="Jiseek Youtube Link" />
        </a>
      </li>
    </FooterContents>
    <Copyright>
      COPYRIGHT &copy; JISEEK, 대한민국 NO.1 음식 검색 서비스 (KOREA&apos;S NO.1
      FOOD SEARCH SERVICE)
    </Copyright>
  </FooterBackground>
);

Footer.propTypes = {
  moveTop: PropTypes.func,
};

Footer.defaultProps = {
  moveTop: null,
};

const FooterBackground = styled.div`
  width: 100vw;
  background: #09351b;
  color: #fffdfa;
  font-size: 0.85rem;
  line-height: 1.2rem;
  position: relative;
  text-align: center;
  padding: 60px 0 4vh 0;

  > input {
    height: 60px;
    object-fit: contain;
    position: absolute;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
  }
`;

const FooterContents = styled.ul`
  padding-bottom: 2rem;
  width: 75vw;
  max-width: 1320px;
  margin: auto;

  > li {
    text-align: center;
    justify-content: center;
    margin-bottom: 0.65rem;

    :first-child {
      /* 지식 知食 */
      display: block;
      font-size: 1rem;
      padding-left: 0.25rem;
      > span {
        /* 지식 */
        font-size: 2rem;
        font-weight: 500;
      }
    }

    > a > svg {
      /* 이메일 주소 옆 아이콘 높이 맞춤 */
      vertical-align: text-bottom;
    }

    :nth-child(3) > a {
      /* 이메일과 contact 아이콘 사이 간격 띄움 */
      margin-left: 0.35rem;
    }

    :last-child {
      /* contact icon */
      display: flex;
      justify-content: center;
      margin-top: 0.85rem;
      > a + a {
        margin-left: 1.5rem;
      }
      > a > img {
        width: 30px;
        height: 30px;
        border-radius: 30px;
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
`;

export default Footer;
