import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "@tanstack/react-router"

import "./index.css"
import { router } from "@/router.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query/query-client"
import { setupAuthRefreshInterceptor } from "./features/auth/api/auth-refresh-interceptor"

setupAuthRefreshInterceptor({
  onRefreshFailure: () => {
    void router.navigate({ to: "/sign-in" })
  },
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
