import React from 'react';
import styled from 'styled-components';
import { Member } from '../../components/Member';

const Members = () => (
  <MemberContents>
    <Title>
      지식<span>知食</span>팀의 지식인<span>知食人</span>들
    </Title>
    <Member />
  </MemberContents>
);

const MemberContents = styled.div`
  padding: 5rem 0;
  max-width: 1320px;
  margin: auto;
`;

const Title = styled.div`
  font-size: 4.5rem;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: baseline;

  > span {
    font-size: 3rem;
  }
`;

export default Members;
