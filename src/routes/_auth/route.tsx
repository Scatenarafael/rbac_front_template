import { AuthLayoutRouteComponent } from '@/features/layouts/components/AuthLayoutRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayoutRouteComponent,
})
