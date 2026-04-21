import { api } from "@/lib/http/api"
import type { IChangePasswordMutationPayload } from "../types"

export async function changePassword({
  user_id,
  ...payload
}: IChangePasswordMutationPayload): Promise<void> {
  await api.patch(`/users/${user_id}`, payload)
}
