import type { AxiosError, InternalAxiosRequestConfig } from "axios"

import { api } from "@/lib/http/api"
import { refresh } from "./auth.service"

type AuthApiErrorResponse = {
  error?: {
    message?: string
  }
}

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

type FailedQueueItem = {
  resolve: () => void
  reject: (error: unknown) => void
}

type SetupAuthRefreshInterceptorOptions = {
  onRefreshFailure: () => void
}

const AUTH_URLS_WITHOUT_REFRESH = [
  "/auth/refresh",
  "/auth/sign-in",
  "/auth/sign-out",
  "/users/register",
]

let interceptorId: number | null = null
let isRefreshing = false
let onRefreshFailure: SetupAuthRefreshInterceptorOptions["onRefreshFailure"] =
  () => {}

const failedQueue: FailedQueueItem[] = []

function isAuthUrlWithoutRefresh(url?: string) {
  return AUTH_URLS_WITHOUT_REFRESH.some((authUrl) => url?.includes(authUrl))
}

function processQueue(error?: unknown) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
      return
    }

    resolve()
  })

  failedQueue.length = 0
}

export function setupAuthRefreshInterceptor({
  onRefreshFailure: handleRefreshFailure,
}: SetupAuthRefreshInterceptorOptions) {
  onRefreshFailure = handleRefreshFailure

  if (interceptorId !== null) return

  interceptorId = api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AuthApiErrorResponse>) => {
      const originalRequest = error.config as RetryRequestConfig | undefined

      const shouldRefresh =
        error.response?.status === 401 &&
        error.response.data?.error?.message === "Access token not found" &&
        originalRequest &&
        !originalRequest._retry &&
        !isAuthUrlWithoutRefresh(originalRequest.url)

      if (!shouldRefresh) {
        return Promise.reject(error)
      }

      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          })
        })
      }

      isRefreshing = true

      try {
        await refresh()
        processQueue()

        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        onRefreshFailure()

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    },
  )
}
