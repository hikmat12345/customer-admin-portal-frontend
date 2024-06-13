'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './auth-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: true } } });

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </AuthProvider>
  );
}
