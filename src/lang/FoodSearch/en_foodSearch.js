import { foodsMapKoToEn } from '../../constants';

const EN_FOOD_SEARCH = {
  foodSearchTitle: 'Food Search',
  foodSearchNameTab: 'By Food Name',
  foodSearchImageTab: 'By Food Photo',
  foodSearchSearchBar: 'Enter the food name',
  foodSearchImageAlt: 'Uploaded image',
  foodSearchImageUpload: 'Upload a photo',
  foodSearchImageSubmit: 'Results',
  foodSearchAriaLable: 'Found foods',
  foodSearchSimilarity: 'Accuracy: {{what}}%',
  foodSearchFoodName: foodsMapKoToEn,
  foodSearchImgResultTitle: 'Result: ',
  foodSearchImgRetry: 'Retry',
  // Title
  foodSearchTitleNutrition: 'Nutrition Info',
  foodSearchTitleRecipes: 'Food Recipes',
  foodSearchMoreRecipesLink: 'More recipes',
  foodSearchMoreInfo: 'More Info',
  foodSearchNoRecipesErr: "Can't load recipes from Youtube.",
  // Loading
  foodSearchAnalysisLoading: 'Food analysis loading image.',
  // Error
  foodSearchNoResult: 'No results image',
  // foodSearchServerErr: 'Server connection is unstable.',
  foodSearchEmptyResultErr: 'There are no food results analyzed.',
  foodSearchTimeOutErr: 'Failed to analyze a food image.(Time Out)',
  foodSearchFavListErr: 'Failed to load favorite food.(Network Error)',
  foodSearchFoodListErr: 'Failed to get full food list.(Network Error)',
};

export default EN_FOOD_SEARCH;
