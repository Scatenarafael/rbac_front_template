import { api } from "@/lib/http/api"
import type {  UserInvitesResponse } from "@/features/tenants/types"
import type { IChangePasswordMutationPayload, TenantResponse } from "../types"
import { routes } from "../Profile.Routes"
import { type Paginated } from "@/features/types"

export async function changePassword({
  user_id,
  ...payload
}: IChangePasswordMutationPayload): Promise<void> {
  await api.patch(routes.changePassword(user_id), payload)
}


export async function requestEntrytoTenant(tenantId: string) {
  await api.post(routes.requestEntry(tenantId))
}

export async function getUserInvites() {
  const response = await api.get<UserInvitesResponse[]>(routes.invitesByUser)
  return response.data
}


export async function getTenantsList(search: string | null, page: number | null, perPage: number | null) {
  const response = await api.get<TenantResponse[] | Paginated<TenantResponse>>(routes.tenants, {
    params: {
      search,
      page,
      per_page: perPage,
    },
  })
  return response.data
}