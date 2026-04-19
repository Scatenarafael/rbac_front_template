import { useEffect } from "react"
import { useNavigate } from "@tanstack/react-router"
import type { AxiosError, InternalAxiosRequestConfig } from "axios"
import { api } from "@/lib/http/api"
import { refresh } from "../api/auth.service"

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

const AUTH_URLS_WITHOUT_REFRESH = [
  "/auth/refresh",
  "/auth/sign-in",
  "/auth/sign-out",
  "/users/register",
]

function isAuthUrlWithoutRefresh(url?: string) {
  return AUTH_URLS_WITHOUT_REFRESH.some((authUrl) => url?.includes(authUrl))
}

export function useAuthRefreshInterceptor() {
  const navigate = useNavigate()

  useEffect(() => {
    let isRefreshing = false
    const failedQueue: FailedQueueItem[] = []

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

    const interceptorId = api.interceptors.response.use(
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
          navigate({ to: "/sign-in" })

          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])
}
