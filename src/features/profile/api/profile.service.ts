import { api } from "@/lib/http/api"
import type {  UserInvitesResponse } from "@/features/tenants/types"
import type { IChangePasswordMutationPayload } from "../types"
import { routes } from "../Auth.Routes"

export async function changePassword({
  user_id,
  ...payload
}: IChangePasswordMutationPayload): Promise<void> {
  await api.patch(routes.changePassword(user_id), payload)
}


export async function getUserInvites() {
  const response = await api.get<UserInvitesResponse[]>(routes.invitesByUser)
  return response.data
}
