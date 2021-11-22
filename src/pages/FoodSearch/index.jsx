import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FoodSearchComponent from '../../components/FoodSearch';
import FoodRecipes from '../../components/FoodSearch/FoodRecipes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const FoodSearch = () => (
  <div>
    FoodSearch
    <QueryClientProvider client={queryClient}>
      <FoodSearchComponent />
      <ReactQueryDevtools initialIsOpen={false} />
      <FoodRecipes food="국수전골" />
    </QueryClientProvider>
  </div>
);

export default FoodSearch;
