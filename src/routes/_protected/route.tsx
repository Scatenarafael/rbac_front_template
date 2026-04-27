import { ProtectedRouteComponent } from '@/features/layouts/ProtectedRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: ProtectedRouteComponent,
})
