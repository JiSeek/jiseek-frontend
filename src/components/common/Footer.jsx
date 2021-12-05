import React from 'react';
import styled from 'styled-components';
import { RiGitlabFill } from 'react-icons/ri';

const Footer = () => (
  <FooterBackground>
    <FooterContent>
      <ul className="util_menu">
        <li style={{ fontSize: '1.25rem' }}>
          <RiGitlabFill />
        </li>
      </ul>
      <div className="txt_info">
        <div className="address">
          주소 : 서울특별시 강남구 테헤란로 138 성홍타워 3층 (우)06236
          <br />
          대표자 : 고예림, 고정현, 김지훈, 박지윤, 이민영, 전진성
          <br />
          이메일 : image2jiseek@gmail.com
        </div>
      </div>
    </FooterContent>
    <Copyright>
      COPYRIGHT &copy; JISEEK, 대한민국 NO.1 음식 검색 서비스
      <br />
      (KOREA&apos;S NO.1 FOOD SEARCH SERVICE)
    </Copyright>
  </FooterBackground>
);

export default Footer;

const FooterBackground = styled.div`
  width: 100vw;
  height: 200px;
  background: #09351b;
  color: #fffdfa;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1320px;
  width: 100%;
  margin: auto;
  padding: 2rem 0;
  padding-bottom: 0;
`;

const Copyright = styled.div`
  margin-top: 2rem;
  padding-bottom: 2rem;
`;
