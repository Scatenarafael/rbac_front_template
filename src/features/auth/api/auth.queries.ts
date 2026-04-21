import { queryOptions, useQuery } from "@tanstack/react-query"
import { me } from "./auth.service"

export const MeQuery = queryOptions({
  queryKey: ["me-query"],
  queryFn: me,
})

export function useMeQuery() {
  return useQuery(MeQuery)
}
