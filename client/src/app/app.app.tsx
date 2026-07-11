import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { FC, ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeView from '@/views/home/home.view.tsx';

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<HomeView />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
