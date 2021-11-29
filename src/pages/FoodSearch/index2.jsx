// import React, { useState, useEffect } from 'react';
// import {
//   useMatch,
//   useLocation,
//   useParams,
//   Navigate,
//   Routes,
//   Route,
// } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import { useAuthContext } from '../../contexts';
// import { CustomLink } from '../../components/common';
// // // 임시 떔빵
// import jiseekApi from '../../api';
// import { useFoodIdMap } from '../../hooks/foodSearch';
// import { foodKeys } from '../../constants';
// import { useImageSlider } from '../../hooks/common';
// import { FoodSearchBar } from '../../components/FoodSearch';
// import FoodSearchImageTab from '../FoodSearchImage';

// const FoodSearchPage = () => {
//   // const [lang] = useLangContext();
//   const { token } = useAuthContext();
//   const param = useParams();
//   const location = useLocation();
//   const match = useMatch({ path: '/food', end: true });

//   // -------------
//   const [listFind, setListFind] = useState([]);
//   const { foodIdMap } = useFoodIdMap();
//   // status: foodIdMapStatus
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

//   console.log('1111', location, param);
//   useEffect(() => {
//     //   setListFind(() => []);
//   }, []);

//   // -------------
//   // 이미지 탭일 경우 로그인 인증되어야 함.
//   if (!match && !token.access) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return (
//     <div>
//       <nav>
//         <CustomLink to=".">음식명 검색</CustomLink>
//         <CustomLink to="image">음식사진 검색</CustomLink>
//       </nav>
//       <section>
//         {/* <h2>{ 음식명 검색}</h2> */}

//         <Routes>
//           <Route
//             path="/"
//             element={
//               <FoodSearchBar
//                 foodNames={Object.keys(foodIdMap)}
//                 setListFind={setListFind}
//               />
//             }
//           />
//           <Route
//             path="image"
//             element={<FoodSearchImageTab setListFind={setListFind} />}
//           />
//           <Route path="*" element={<Navigate to="/food" replace />} />
//         </Routes>

//         {!match && listFind.length === 0 && (
//           <>
//             <h2>음식사진 검색</h2>
//           </>
//         )}
//         {listFind.length !== 0 && (
//           <article>
//             <section>
//               <h2>음식 분석 사진</h2>
//               {RenderImageSlider()}
//               {/* <LikeButton
//                 target="food"
//                 id={foodIdMap[listFind[slideIdx]]}
//                 initState={false}
//               /> */}
//             </section>
//             <section>
//               <h2>영양정보 분석 결과</h2>
//               {foodInfoStatus === 'loading' ? (
//                 <FontAwesomeIcon icon={faSpinner} spin />
//               ) : (
//                 <span>
//                   영양정보 결과 컴포넌트(프레젠테이셔널) | {foodInfo?.data}
//                 </span>
//               )}
//             </section>
//             <section>
//               <h2>음식 레시피</h2>
//               {foodInfoStatus === 'loading' ? ( // 임시땜빵
//                 <FontAwesomeIcon icon={faSpinner} spin />
//               ) : (
//                 <>
//                   {listFind[slideIdx]}
//                   <FoodRecipes
//                     food={listFind[slideIdx] ? listFind[slideIdx] : ''}
//                   />
//                 </>
//               )}
//             </section>
//           </article>
//         )}
//       </section>
//     </div>
//   );
// };
