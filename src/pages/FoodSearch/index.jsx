import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import FoodSearchComponent from '../../components/FoodSearch';

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
    </QueryClientProvider>
  </div>
);

export default FoodSearch;
