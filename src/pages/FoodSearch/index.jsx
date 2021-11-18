import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FoodSearchContainer from '../../components/FoodSearch/FoodSearchContainer';

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
      <FoodSearchContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

export default FoodSearch;
