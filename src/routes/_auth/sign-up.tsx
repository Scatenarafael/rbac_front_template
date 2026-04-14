import { SignUpContentPage } from '@/features/auth/components/SignUpContentPage'
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUpContentPage,
})
