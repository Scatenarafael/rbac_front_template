import { AuthLayoutRouteComponent } from '@/features/layouts/AuthLayoutRouteComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayoutRouteComponent,
})
