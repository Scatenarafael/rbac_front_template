import type { AxiosResponse } from "axios"
import type { RegisteredUserResponse, SignInPayload, SignUpPayload } from "../types"
import { api } from "@/lib/http/api"



export async function signIn(payload: SignInPayload): Promise<void> {
  await api.post('/auth/login', payload)
}



export async function signUp(payload: SignUpPayload): Promise<AxiosResponse<RegisteredUserResponse>> {
  return await api.post<RegisteredUserResponse>('/users/register', payload)
}