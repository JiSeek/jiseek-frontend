import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import BoardUpload from './BoardUpload';

function BoardIndex(){
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <BoardUpload />
        </QueryClientProvider>
    );
}

export default BoardIndex;