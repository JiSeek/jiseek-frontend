import { foodsMapKoToEn } from '../../constants';

const KO_FOOD_SEARCH = {
  foodSearchTitle: '음식 알아보기',
  foodSearchNameTab: '음식 이름',
  foodSearchImageTab: '음식 사진',
  foodSearchSearchBar: '음식명으로 검색해보세요.',
  foodSearchImageAlt: '업로드한 이미지',
  foodSearchImageUpload: '사진 선택',
  foodSearchImageSubmit: '결과 보기',
  foodSearchAriaLable: '찾은 음식들',
  foodSearchSimilarity: '정확도: {{what}}%',
  foodSearchFoodName: Object.keys(foodsMapKoToEn).reduce(
    (table, name) => ({ ...table, [name]: name }),
    {},
  ),
  foodSearchImgResultTitle: '결과: ',
  foodSearchImgRetry: '다시 검색하기',
  // Title
  foodSearchTitleNutrition: '영양 정보',
  foodSearchTitleRecipes: '음식 레시피',
  foodSearchMoreRecipesLink: '레시피 더보기',
  foodSearchMoreInfo: '설명 더보기',
  foodSearchNoRecipesErr: '유튜브에서 레시피를 불러올 수 없습니다.',
  // Loading
  foodSearchAnalysisLoading: '음식 분석 로딩 이미지',
  // Error
  foodSearchNoResult: '결과 없음 이미지',
  foodSearchEmptyResultErr: '분석된 음식 결과가 없습니다.',
  foodSearchTimeOutErr: '음식 사진 분석에 실패했습니다.(시간 초과)',
  foodSearchFavListErr: '관심 음식 목록을 불러오지 못했습니다.(네트워크 오류)',
  foodSearchFoodListErr:
    '가능한 전체 음식 목록을 불러오지 못했습니다.(네트워크 오류)',
};

export default KO_FOOD_SEARCH;
