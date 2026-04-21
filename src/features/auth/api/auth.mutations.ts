import { signIn, signOut, signUp } from "./auth.service"
import { useMutationCallback } from "@/features/utils"

export function useSignInMutation() {
  return useMutationCallback({
    mutationFnCallback: signIn,
    mutationActionProps: {
      success: {
        message: "Signed in successfully",
        redirectTo: "/",
      },
    },
  })
}

export function useSignUpMutation() {
  return useMutationCallback({
    mutationFnCallback: signUp,
    mutationActionProps: {
      success: {
        message: "Account created successfully",
        redirectTo: "/sign-in",
      },
    },
  })
}

export function useSignOutMutation() {
  return useMutationCallback({
    mutationFnCallback: signOut,
    mutationActionProps: {
      success: {
        message: "Signed out successfully",
        redirectTo: "/sign-in",
      },
    },
  })
}
