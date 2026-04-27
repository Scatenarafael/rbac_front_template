import { AuthProvider } from '@/features/auth/contexts/auth-context'
import { ProtectedLayoutRouteComponent } from '@/features/layouts/ProtectedLayoutRouteComponent'

export function ProtectedRouteComponent() {
  return (
    <AuthProvider>
      <ProtectedLayoutRouteComponent />
    </AuthProvider>
  )
}
