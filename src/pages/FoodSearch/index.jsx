import React from 'react';
import FoodSearch from '../../components/FoodSearch'

// const FoodSearch = () => <div>FoodSearch</div>;
<FoodSearch/>
export default FoodSearch;

// TEST 코드
// useEffect(() => {
//   (async () => {
//     await jiseekApi
//       .getRecipeList({
//         q: '불고기',
//         videoEmbeddable: true,
//         type: 'video',
//         regionCode: 'KR',
//         part: 'snippet',
//         fields:
//           'items(id(videoId),snippet(title,description,thumbnails(default(url)),channelTitle))',
//         maxResult: 5,
//       })
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   })();
// }, []);
