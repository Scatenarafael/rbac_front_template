import { useMutationCallback } from "@/features/utils"
import { changePassword } from "./profile.service"

export function useChangePasswordMutation() {
  return useMutationCallback({
    mutationFnCallback: changePassword,
    mutationActionProps: {
      success: {
        message: "Password changed successfully",
      },
    },
  })
}
