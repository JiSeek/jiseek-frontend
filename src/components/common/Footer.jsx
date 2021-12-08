import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import {
  FooterLogo,
  FooterGithub,
  FooterGitlab,
  FooterYoutube,
} from '../../assets/images/images';

const Footer = () => (
  <FooterBackground>
    <img src={FooterLogo} alt="Footer Logo" />
    <FooterContents>
      <About>
        <ul>
          <li>
            <span>지식</span>知食
          </li>
          <li>
            <Link to="member">
              고예림, 고정현, 김지훈, 박지윤, 이민영, 전진성
            </Link>
          </li>
          <li>
            image2jiseek@gmail.com
            <a href="mailto:image2jiseek@gmail.com">
              <MdEmail />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/JiSeek"
              target="_blank"
              rel="noreferrer"
            >
              <img src={FooterGithub} alt="Jiseek Github Link" />
            </a>
            <a
              href="https://kdt-gitlab.elice.io/002-part3-cnn/team2"
              target="_blank"
              rel="noreferrer"
            >
              <img src={FooterGitlab} alt="Jiseek Gitlab Link" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <img src={FooterYoutube} alt="Jiseek Youtube Link" />
            </a>
          </li>
        </ul>
      </About>
      <SiteMap>
        <ul>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>음식 알아보기</li>
          <li>
            <span>
              <Link to="food">이름 검색</Link>
              <Link to="food/image">사진 검색</Link>
            </span>
          </li>
          <li>
            <Link to="board">커뮤니티</Link>
          </li>
        </ul>
      </SiteMap>
    </FooterContents>
    <Copyright>
      COPYRIGHT &copy; JISEEK, 대한민국 NO.1 음식 검색 서비스 (KOREA&apos;S NO.1
      FOOD SEARCH SERVICE)
    </Copyright>
  </FooterBackground>
);

export default Footer;

const FooterBackground = styled.div`
  width: 100vw;
  background: #09351b;
  color: #fffdfa;
  font-size: 0.85rem;
  line-height: 1.2rem;
  padding: 3rem 0;
  position: relative;
  text-align: center;

  > img {
    height: 60px;
    object-fit: contain;
    position: absolute;
    top: 0;
    transform: translateY(-50%) translateX(-50%);
  }
`;

const FooterContents = styled.div`
  display: flex;
  margin: auto;
  padding: 0 4vw 2rem 3vw;
  justify-content: space-evenly;
  max-width: 1320px;
`;

const About = styled.div`
  > ul {
    > li {
      text-align: center;
      justify-content: center;
      margin-bottom: 0.65rem;
      display: flex;
      align-items: center;

      :first-child {
        display: block;
        > span {
          font-size: 1.5rem;
          font-weight: 500;
        }
      }

      > a {
        > svg {
          vertical-align: text-bottom;
        }
      }

      :nth-child(3) > a {
        margin-left: 0.35rem;
      }

      :last-child {
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
  }
`;

const SiteMap = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  > ul > li {
    margin-bottom: 1.2rem;
    :nth-child(2) {
      margin-bottom: 0.25rem;
    }
    > span {
      font-size: 0.75rem;
      font-weight: 400;
      > a {
        :first-child {
          padding-right: 0.5rem;
          border-right: 1px solid;
        }
        :last-child {
          margin-left: 0.5rem;
        }
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
`;
