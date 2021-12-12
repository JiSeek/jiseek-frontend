import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { SiGithub, SiBloglovin } from 'react-icons/si';
import { parseParagraph } from '../../utils';

const Member = () => {
  const { t } = useTranslation();

  return (
    <MemberOutlet>
      {[
        'MemberYRGo',
        'MemberJHKoh',
        'MemberJHKim',
        'MemberJYPark',
        'MemberMYLee',
        'MemberJSJeon',
      ].map((name) => (
        <EachMember>
          <img src={t(`${name}.profile`)} alt={t(`${name}.name`)} width={30} />
          <div>
            <span>{t(`${name}.name`)}</span>

            <span>
              <a href={t(`${name}.git`)} target="_blank" rel="noreferrer">
                <SiGithub />
              </a>
              {t(`${name}.blog`) && (
                <a href={t(`${name}.blog`)} target="_blank" rel="noreferrer">
                  <SiBloglovin />
                </a>
              )}
            </span>
          </div>
          <p>
            <span>{t(`${name}.part`)}</span>
            {parseParagraph(t(`${name}.role`))}
            {parseParagraph(t(`${name}.intro`))}
          </p>
          <div />
        </EachMember>
      ))}
    </MemberOutlet>
  );
};

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
