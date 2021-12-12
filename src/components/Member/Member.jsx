import React from 'react';
import styled from 'styled-components';
import { SiGithub } from 'react-icons/si';
import {
  Yerim,
  Jihun,
  Jiyun,
  Minyeong,
  Jinseong,
  Jeonghyeon,
  Velog,
} from '../../assets/images/images';

const Member = () => (
  <MemberOutlet>
    <EachMember>
      <img src={Yerim} alt="Profile of Yerim" />
      <div>
        <span>고예림</span>
        <span>
          <a href="https://github.com/yeahLim" target="_blank" rel="noreferrer">
            <SiGithub />
          </a>
        </span>
      </div>
      <p>
        <span>Frontend</span>
        <span>
          #커뮤니티, 디테일, 업로드 페이지 구성 및 기능 구현 #게시글 CRUD 기능
          구현
          <br />
          #댓글 CRUD 기능 구현 #etc
        </span>
        <span>
          엘리스라는 프로그램을 통해 처음으로 웹 분야를 배우게 되었습니다.
          프론트엔드 직무는 다른 분야와 달리 화면에서 실시간으로 제 코드가
          반영되어 큰 재미를 느끼고 있습니다. 이번 프로젝트를 하면서 React
          Query와 container/presentational 패턴에 대해 배울 수 있었습니다.
          앞으로 효율적인 구조와 편리한 유저경험을 위해 노력하는 개발자가
          되겠습니다!
        </span>
      </p>
      <div />
    </EachMember>
    <EachMember>
      <img src={Jeonghyeon} alt="Profile of Yerim" />
      <div>
        <span>고정현</span>
        <span>
          <a
            href="https://github.com/kojh0111"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub />
          </a>
        </span>
      </div>
      <p>
        <span>Backend</span>
        <span>
          #음식 검색 관련 API 구현 #게시판 관련 REST API 구현 #서비스 배포 #etc
        </span>
        <span>새로운 것에 도전하는 게 즐거운 백엔드 개발자입니다.</span>
      </p>
      <div />
    </EachMember>
    <EachMember>
      <img src={Jihun} alt="Profile of Yerim" />
      <div>
        <span>김지훈</span>
        <span>
          <a
            href="https://github.com/combiJihoon"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub />
          </a>
          <a
            href="https://velog.io/@combi_jihoon"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Velog} alt="velog logo" width={28} />
          </a>
        </span>
      </div>
      <p>
        <span>Backend</span>
        <span>
          #자체 유저 인증 및 소셜 인증(네이버&카카오&구글) 관련 API 구현 <br />
          #마이 페이지 및 좋아요 관련 API 구현 #서비스 배포 #etc
        </span>
        <span>
          화학 연구원으로 일하다 실험 자동화와 효율성에 관심을 갖고 개발자에
          입문하게 되었습니다. 필요한 데이터를 전달하고 배포 환경을 구축하는
          일이 재밌는 백엔드 개발자입니다!
        </span>
      </p>
      <div />
    </EachMember>
    <EachMember>
      <img src={Jiyun} alt="Profile of Yerim" />

      <div>
        <span>박지윤</span>
        <span>contact</span>
      </div>
      <p>
        <span>AI</span>
        <span>#etc</span>
        <span>간단한 본인 소개 글</span>
      </p>
      <div />
    </EachMember>
    <EachMember>
      <img src={Minyeong} alt="Profile of Yerim" />
      <div>
        <span>이민영</span>
        <span>
          <a href="https://github.com/Raihyul" target="_blank" rel="noreferrer">
            <SiGithub />
          </a>
        </span>
      </div>
      <p>
        <span>Frontend</span>
        <span>#외부 API 연동 #UX/UI 디자인 #etc</span>
        <span>
          기계 설계에서 웹 개발로 전향하여 프론트엔드 개발자를 희망하고
          있습니다! <br /> 사용자 경험성을 최우선으로 하고 있으며, UX/UI
          디자인을 즐기고 있습니다:)
        </span>
      </p>
      <div />
    </EachMember>
    <EachMember>
      <img src={Jinseong} alt="Profile of Yerim" />
      <div>
        <span>전진성</span>
        <span>
          <a
            href="https://github.com/notCoderJ"
            target="_blank"
            rel="noreferrer"
          >
            <SiGithub />
          </a>
        </span>
      </div>
      <p>
        <span>Frontend</span>
        <span>
          #음식 검색(이름, 사진) 페이지 기능 구현 #커뮤니티 페이지 기능 리펙토링
          <br />
          #사용자 관련 기능(로그인, 회원가입, 마이 페이지) 구현 #etc
        </span>
        <span>
          지난 3년간 시스템 개발자로 일하다가 즉각적인 결과물 확인과 다양한
          사용자에게 서비스를 제공할 수 있다는 매력에 빠져 프론트엔드 분야에
          도전하게 되었습니다. <br />
          코드 구조화를 좋아하고 사용자가 서비스를 사용하며 불쾌감을 느끼지
          않도록 세세한 부분까지 신경쓰는 프론트엔드 개발자가 되기 위해 노력하고
          있습니다!
        </span>
      </p>
      <div />
    </EachMember>
  </MemberOutlet>
);

const MemberOutlet = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem;
`;

const EachMember = styled.li`
  width: 80vw;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 100px 100px 1fr;
  grid-template-rows: 100px 120px auto;
  grid-template-areas:
    'image image name'
    'image image content'
    '. background content';
  margin-bottom: 5rem;
  word-break: keep-all;
  font-family: 'Member';
  font-weight: bold;

  > img {
    grid-area: image;
    width: 180px;
    height: 180px;
    border-radius: 10px;
    object-fit: contain;
    /* background: greenyellow; */
    box-shadow: 0px 0 26px 5px rgb(0 0 0 / 20%);
    z-index: 1;
    padding: 20px 10px;
  }

  > div {
    grid-area: name;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 4rem;
    padding: 0 1.25rem;
    margin-bottom: 1.25rem;

    > span:last-child {
      font-size: 1.75rem;
      > a {
        margin-left: 0.75rem;
      }
    }
    :last-child {
      grid-area: background;
      background: url('http://www.bibigo.com/img/kr/bg_sub5.gif') repeat 0 0;
      background-size: 50px;
      height: 100%;
      border-radius: 0 0 0 10px;
    }
  }
  > p {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 2rem 2rem 2rem;
    font-size: 1.65rem;
    letter-spacing: 1.5px;
    background: url('http://www.bibigo.com/img/kr/bg_sub5.gif') repeat;
    background-size: 50px;
    border-radius: 0 10px 10px 0;
    > span {
      margin: 0.5rem 0;
      :first-child {
        font-size: 2.25rem;
      }
    }
  }

  :nth-child(even) {
    grid-template-columns: 1fr 100px 100px;
    grid-template-rows: 100px 120px auto;
    grid-template-areas:
      'name image image '
      'content image image '
      'content background .';
    text-align: right;
    margin-left: auto;
    > div {
      justify-content: flex-end;
      :last-child {
        border-radius: 0 0 10px 0;
      }
    }
    > p {
      border-radius: 10px 0 0 10px;
    }
  }
`;

export default Member;
