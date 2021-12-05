import React from 'react';
import styled from 'styled-components';
import { RiGitlabFill } from 'react-icons/ri';

const Footer = () => (
  <FooterBackground>
    <FooterContent>
      <RiGitlabFill />
    </FooterContent>
  </FooterBackground>
);

export default Footer;

const FooterBackground = styled.div`
  width: 100vw;
  padding: 3rem 0;
  background: #09351b;
`;

const FooterContent = styled.div`
  max-width: 1320px;
  margin: auto;
  color: #fffdfa;
  font-size: 12px;
`;
