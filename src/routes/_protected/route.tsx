import { AuthProvider } from '@/features/auth/contexts/auth-context'
import { ProtectedLayoutRouteComponent } from '@/features/layouts/ProtectedLayoutRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: ProtectedRoute,
})



export function ProtectedRoute() {
  return (
    <AuthProvider>
      <ProtectedLayoutRouteComponent />
    </AuthProvider>
  )
}