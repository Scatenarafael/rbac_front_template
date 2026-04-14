import { ProtectedLayoutRouteComponent } from '@/features/layouts/components/ProtectedLayoutRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected')({
  component: ProtectedLayoutRouteComponent,
})
