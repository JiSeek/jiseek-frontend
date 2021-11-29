// import React, { useEffect, useState } from 'react';
// import { useQuery } from 'react-query';
// // 임시 떔빵
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// //
// import jiseekApi from '../../api';
// import { useFoodIdMap, useFoodUpload } from '../../hooks/foodSearch';
// import SearchTab from './SearchTabContainer';
// import FoodSearchBar from './FoodSearchBarContainer';
// import FoodRecipes from './FoodRecipes';
// import { foodKeys } from '../../constants';
// import { useImageSlider } from '../../hooks/common';
// import { LikeButton } from '../common';

// // TODO: 전반적인 예외 처리 + 게시판 연동 & sns링크 공유 기능 구현.
// const FoodSearch = () => {
//   const [imageTab, setImageTab] = useState(true);
//   const [listFind, setListFind] = useState([]);
//   // status: foodIdMapStatus
//   const { foodIdMap } = useFoodIdMap();

//   useEffect(() => setListFind(() => []), [imageTab]);

//   const {
//     analysis,
//     // status: analysisStatus,
//     RenderFoodUpload,
//   } = useFoodUpload();

//   // 사진 분석 결과 찾은 음식들 저장
//   useEffect(() => setListFind(() => Object.keys(analysis)), [analysis]);

//   const { slideIdx, RenderImageSlider } = useImageSlider(listFind, {
//     label: { ko: '찾은 음식들', en: 'found foods' },
//   });

//   // 현재 음식 결과 조회 쿼리
//   const { data: foodInfo, status: foodInfoStatus } = useQuery(
//     foodKeys.detailById(foodIdMap[listFind[slideIdx]]),
//     jiseekApi.get(),
//     {
//       staleTime: Infinity,
//       enabled: !!listFind.length, // TODO: 발생 의존성 처리 고민...
//     },
//   );

//   return (
//     <div>
//       <SearchTab
//         disabled={foodInfoStatus === 'loading'}
//         imageTab={imageTab}
//         setImageTab={setImageTab}
//       />
//       {imageTab ? (
//         <section>
//           {listFind.length === 0 ? (
//             <>
//               <h2>사진 업로드</h2>
//               {RenderFoodUpload()}
//             </>
//           ) : (
//             <>
//               <h2>사진 분석 결과</h2>
//               {RenderImageSlider()}
//               <LikeButton
//                 target="food"
//                 id={foodIdMap[listFind[slideIdx]]}
//                 initState={false}
//               />
//             </>
//           )}
//         </section>
//       ) : (
//         <FoodSearchBar
//           foodNames={Object.keys(foodIdMap)}
//           setListFind={setListFind}
//         />
//       )}
//       <div>
//         {foodInfoStatus === 'loading' ? (
//           <FontAwesomeIcon icon={faSpinner} spin />
//         ) : (
//           <span>영양정보 결과 컴포넌트(프레젠테이셔널) | {foodInfo?.data}</span>
//         )}
//       </div>
//       <div>
//         {foodInfoStatus === 'loading' ? ( // 임시땜빵
//           <FontAwesomeIcon icon={faSpinner} spin />
//         ) : (
//           <>
//             {listFind[slideIdx]}
//             <FoodRecipes food={listFind[slideIdx] ? listFind[slideIdx] : ''} />
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodSearch;
