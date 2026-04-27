import type { AxiosResponse } from "axios"
import type { RegisteredUserResponse, SignInPayload, SignUpPayload } from "../types"
import { api } from "@/lib/http/api"
import type { IProfileProps } from "../types/auth-types"
import { routes } from "../Auth.Routes"



export async function signIn(payload: SignInPayload): Promise<void> {
  await api.post(routes.signIn, payload)
}



export async function signUp(payload: SignUpPayload): Promise<AxiosResponse<RegisteredUserResponse>> {
  return await api.post<RegisteredUserResponse>(routes.signUp, payload)
}

export async function me(): Promise<AxiosResponse<IProfileProps>> {
  return await api.get<IProfileProps>(routes.me)
}


export async function refresh(): Promise<void> {
  await api.post(routes.refresh)
}

export async function signOut(): Promise<void> {
  await api.post(routes.signOut)
}