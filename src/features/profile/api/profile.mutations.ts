import { useMutationCallback } from "@/features/utils"
import { changePassword, requestEntrytoTenant } from "./profile.service"

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


export function useRequestEntryToTenantMutation() {
  return useMutationCallback({
    mutationFnCallback: requestEntrytoTenant,
    mutationActionProps: {
      success: {
        message: "Entry requested successfully",
      },
    },
  })
}