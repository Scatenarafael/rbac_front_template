import { useQueryClient, type QueryKey } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
  
type OnMutationActionProps = {
  type?: "success" | "error"
  message: string | string[]
  redirectTo?: string | null
  refreshQueryKey?: string | QueryKey | null
}

export function useOnMutationAction() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return ({
    type = "success",
    message,
    redirectTo = null,
    refreshQueryKey = null,
  }: OnMutationActionProps) => {
    const notify = type === "success" ? toast.success : toast.error
    const messages = Array.isArray(message) ? message : [message]
    messages.forEach((msg) => notify(msg))

    if (refreshQueryKey) {
      const queryKey = (Array.isArray(refreshQueryKey)
        ? refreshQueryKey
        : [refreshQueryKey]) as QueryKey

      queryClient.refetchQueries({ queryKey })
    }

    if (redirectTo) {
      navigate({ to: redirectTo })
    }
  }
}