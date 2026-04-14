import { createRootRoute } from '@tanstack/react-router'
import { RootComponent } from '../features/layouts/components/root-component'

export const Route = createRootRoute({
  component: RootComponent,
})
