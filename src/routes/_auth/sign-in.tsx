import { SignInContentPage } from '@/features/auth/components/SignInContentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignInContentPage,
})
