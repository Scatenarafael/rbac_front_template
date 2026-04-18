import { ProtectedLayoutRouteComponent } from '@/features/layouts/ProtectedLayoutRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayoutRouteComponent,
})
