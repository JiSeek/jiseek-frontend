import React from 'react';
import styled from 'styled-components';

const Member = () => (
  <MemberContents>
    <Title>지식인 知食人 소개</Title>
  </MemberContents>
);

const MemberContents = styled.div`
  padding: 4rem 0;
  max-width: 1320px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
`;

export default Member;
