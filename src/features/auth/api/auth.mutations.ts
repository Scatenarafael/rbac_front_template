// src/features/users/api/users.mutations.ts
import { useMutation } from '@tanstack/react-query'
import type { SignInPayload, SignUpPayload } from '../types'
import { signIn, signUp } from './auth.service'
import type { AxiosError } from 'axios'
import { useOnMutationAction } from '@/lib/utils'

export function useSignInMutation() {
  const onMutationAction = useOnMutationAction()

  return useMutation({
    mutationFn: async (payload: SignInPayload) => await signIn(payload),
    onSuccess: async () => {
      onMutationAction({
        type: "success",
        message: 'Login bem-sucedido',
        redirectTo: '/',
        refreshQueryKey: null
      })
    },
    onError: async (error: AxiosError) => {
      const errors: string[] = []
      
      Object.values(error.response?.data || {}).forEach((value) => {
        errors.push(value as string)
      })

      onMutationAction(
        {
          type: "error",
          message: errors,
          redirectTo: null,
          refreshQueryKey: null
        }
      )
    }
  })
}

export function useSignUpMutation() {
  const onMutationAction = useOnMutationAction()

  return useMutation({
    mutationFn: async (payload: SignUpPayload) => await signUp(payload),
    onSuccess: async () => {
      onMutationAction({
        type: "success",
        message: 'Registro bem-sucedido',
        redirectTo: '/sign-in',
        refreshQueryKey: null
      })
    },
    onError: async (error: AxiosError) => {
      const errors: string[] = []
      
      Object.values(error.response?.data || {}).forEach((value) => {
        errors.push(value as string)
      })

      onMutationAction(
        {
          type: "error",
          message: errors,
          redirectTo: null,
          refreshQueryKey: null
        }
      )
    }
  })
}
