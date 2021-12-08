import React, { useState } from 'react';
import { useMutation } from 'react-query';
import jiseekApi from '../../api';

const MainPage = () => {
  const [comment, setComment] = useState('');
  const { mutate } = useMutation(
    (content) =>
      jiseekApi.put('/boards/24/comments/31', {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM4OTMyNjQ1LCJpYXQiOjE2Mzg5MjUyNDgsImp0aSI6ImNiMTJhMjk1YWI3MDQyMTM4MTNhODYxZWMyNGNjYzQ0IiwidXNlcl9pZCI6NjF9.P4TVwn_kX0t53iH-Ee7-MR6D01St-VdYrgCVdWrS-zE',
        content,
      }),
    {
      onMutate: (inData) => {
        console.log('인자', inData);
      },
      onSuccess: (data) => {
        console.log('성공', data);
      },
      onError: (err) => {
        console.error('에러', err);
      },
      onSettled: () => {
        console.log('끝');
      },
    },
  );
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(comment);
  };

  return (
    <div>
      Main Page
      <form onSubmit={onSubmit}>
        <textarea type="text" onChange={(e) => setComment(e.target.value)} />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default MainPage;
