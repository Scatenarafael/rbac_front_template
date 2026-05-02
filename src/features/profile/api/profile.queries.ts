
import { queryOptions, useQuery } from "@tanstack/react-query"
import { getTenantsList, getUserInvites } from "./profile.service"

export const UserInvitesQuery = queryOptions({
  queryKey: ["user-invites-query"],
  queryFn: getUserInvites,
})

export function useUserInvitesQuery(enabled = false) {
  return useQuery({
    ...UserInvitesQuery,
    enabled,
  })
}


export const TenantsQuery = (search: string | null, page: number | null, perPage: number | null) => {
  return queryOptions({
    queryKey: ["tenants-query", search, page, perPage],
    queryFn: async () => getTenantsList(search, page, perPage),
  })
}

export function useTenantsQuery(
  search: string | null = null,
  page: number | null = null,
  perPage: number | null = null,
  enabled = false
) {
  return useQuery({
    ...TenantsQuery(search, page, perPage),
    enabled,
  })
}
