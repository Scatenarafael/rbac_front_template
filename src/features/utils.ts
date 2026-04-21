import { useQueryClient, type QueryKey } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { clsx, type ClassValue } from "clsx"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"


import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from "@tanstack/react-query"
import { isAxiosError, type AxiosError } from "axios"

type MutationFeedbackOptions = Partial<Omit<OnMutationActionProps, "type">>

// Groups the optional feedback shown after a successful or failed mutation.
export type MutationActionProps = {
  success?: MutationFeedbackOptions
  error?: MutationFeedbackOptions
}

// Reuses React Query's mutation function signature to keep variables and return types inferred.
type MutationFnCallback<TData, TError, TVariables, TOnMutateResult> =
  NonNullable<
    UseMutationOptions<TData, TError, TVariables, TOnMutateResult>["mutationFn"]
  >

// Defines the wrapper options while preserving React Query's generic mutation typing.
export type UseMutationCallbackProps<
  TData = void,
  TError = AxiosError,
  TVariables = void,
  TOnMutateResult = unknown,
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TOnMutateResult>,
  "mutationFn"
> & {
  mutationFnCallback: MutationFnCallback<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >
  mutationActionProps?: MutationActionProps
}

const DEFAULT_SUCCESS_MESSAGE = "Action completed successfully"
const DEFAULT_ERROR_MESSAGE = "Could not complete the operation"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type OnMutationActionProps = {
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
      const queryKey = (
        Array.isArray(refreshQueryKey) ? refreshQueryKey : [refreshQueryKey]
      ) as QueryKey

      queryClient.refetchQueries({ queryKey })
    }

    if (redirectTo) {
      navigate({ to: redirectTo })
    }
  }
}




// Converts any API error value into a list of messages that can be rendered as toasts.
function normalizeErrorMessages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap(normalizeErrorMessages)
  }

  if (typeof value === "string") {
    return [value]
  }

  if (value == null) {
    return []
  }

  return [String(value)]
}

// Extracts server-side validation messages from Axios errors when they are available.
function getMutationErrorMessages(error: unknown): string[] {
  if (!isAxiosError(error)) {
    return []
  }

  const responseData = error.response?.data

  if (
    responseData &&
    typeof responseData === "object" &&
    !Array.isArray(responseData)
  ) {
    return Object.values(responseData).flatMap(normalizeErrorMessages)
  }

  return normalizeErrorMessages(responseData)
}

// Wraps useMutation with shared toast, redirect, and query refresh behavior.
export function useMutationCallback<
  TData = void,
  TError = AxiosError,
  TVariables = void,
  TOnMutateResult = unknown,
>({
  mutationFnCallback,
  mutationActionProps,
  onSuccess,
  onError,
  ...mutationOptions
}: UseMutationCallbackProps<
  TData,
  TError,
  TVariables,
  TOnMutateResult
>): UseMutationResult<TData, TError, TVariables, TOnMutateResult> {
  const onMutationAction = useOnMutationAction()
  const successAction = mutationActionProps?.success
  const errorAction = mutationActionProps?.error

  return useMutation<TData, TError, TVariables, TOnMutateResult>({
    ...mutationOptions,
    mutationFn: mutationFnCallback,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await onSuccess?.(data, variables, onMutateResult, context)

      onMutationAction({
        type: "success",
        message: successAction?.message ?? DEFAULT_SUCCESS_MESSAGE,
        redirectTo: successAction?.redirectTo ?? "/sign-in",
        refreshQueryKey: successAction?.refreshQueryKey ?? null,
      })
    },
    onError: async (error, variables, onMutateResult, context) => {
      await onError?.(error, variables, onMutateResult, context)

      const errors = getMutationErrorMessages(error)

      onMutationAction({
        type: "error",
        message:
          errors.length > 0
            ? errors
            : (errorAction?.message ?? DEFAULT_ERROR_MESSAGE),
        redirectTo: errorAction?.redirectTo ?? null,
        refreshQueryKey: errorAction?.refreshQueryKey ?? null,
      })
    },
  })
}
