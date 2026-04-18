// src/lib/query/query-client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1 minuto
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
