import type { AxiosResponse } from "axios"
import type { RegisteredUserResponse, SignInPayload, SignUpPayload } from "../types"
import { api } from "@/lib/http/api"
import type { IProfileProps } from "../types/auth-types"



export async function signIn(payload: SignInPayload): Promise<void> {
  await api.post('/auth/sign-in', payload)
}



export async function signUp(payload: SignUpPayload): Promise<AxiosResponse<RegisteredUserResponse>> {
  return await api.post<RegisteredUserResponse>('/users/register', payload)
}

export async function me(): Promise<AxiosResponse<IProfileProps>> {
  return await api.get<IProfileProps>('/auth/me')
}


export async function refresh(): Promise<void> {
  await api.post('/auth/refresh')
}

export async function signOut(): Promise<void> {
  await api.post('/auth/sign-out')
}