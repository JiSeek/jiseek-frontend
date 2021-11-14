import React, { useEffect } from 'react';
import jiseekApi from './api';
import './App.css';

const App = () => {
  // TEST 코드
  useEffect(() => {
    (async () => {
      await jiseekApi
        .getRecipeList({
          q: '불고기',
          videoEmbeddable: true,
          type: 'video',
          regionCode: 'KR',
          part: 'snippet',
          fields:
            'items(id(videoId),snippet(title,description,thumbnails(default(url)),channelTitle))',
          maxResult: 5,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    })();
  }, []);

  return <h1>test</h1>;
};

export default App;
