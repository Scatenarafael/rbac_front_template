
import { queryOptions, useQuery } from "@tanstack/react-query"
import { getUserInvites } from "./profile.service"

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
