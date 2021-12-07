import React from 'react';
import styled from 'styled-components';
import { RiGitlabFill, RiInstagramFill, RiYoutubeFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { FaFacebookSquare } from 'react-icons/fa';
import { FooterLogo } from '../../assets/images/images';

const Footer = () => (
  <FooterBackground>
    <FooterContents>
      <img src={FooterLogo} alt="Footer Logo" />
      <div>
        <ul>
          <li>
            <span>지식</span>知食
          </li>
          <li>고예림, 고정현, 김지훈, 박지윤, 이민영, 전진성</li>
          <li>
            image2jiseek@gmail.com
            <a href="mailto:image2jiseek@gmail.com">
              <MdEmail />
            </a>
          </li>
          <li>
            <RiInstagramFill />
            <FaFacebookSquare />
            <RiYoutubeFill />
            <a
              href="https://kdt-gitlab.elice.io/002-part3-cnn/team2"
              target="_blank"
              rel="noreferrer"
            >
              <RiGitlabFill />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>홈</li>
            <li>음식 알아보기</li>
            <li>이름으로 검색하기</li>
            <li>사진으로 검색하기</li>
          <li>커뮤니티</li>
          <li>소개</li>
        </ul>
      </div>
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
  height: 100%;
  background: #09351b;
  color: #fffdfa;
  font-size: 0.85rem;
  line-height: 1.2rem;
`;

const FooterContents = styled.div`
  display: flex;
  margin: auto;
  padding: 2rem 1rem;
  justify-content: space-between;
  max-width: 1320px;

  > img {
    width: 100px;
    object-fit: contain;
  }

  > div {
    /* width: 100%;
    margin: auto; */
  }
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
`;
