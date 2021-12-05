import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <FooterBackground>
    <FooterContent>Footer</FooterContent>
  </FooterBackground>
);

export default Footer;

const FooterBackground = styled.div`
  width: 100vw;
  height: 150px;
  background: #09351b;
`;

const FooterContent = styled.div`
  max-width: 1320px;
  margin: auto;
  color: #fffdfa;
  font-size: 12px;
`;