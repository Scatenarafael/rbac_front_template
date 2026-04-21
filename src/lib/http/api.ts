// src/lib/http/api.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10_000,
  withCredentials: true,
})

// api.interceptors.request.use((config) => {
//   // Example: add token
//   // const token = localStorage.getItem('token')
//   // if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Example: redirect to sign-in, trigger token refresh, etc.
//     }

//     return Promise.reject(error)
//   },
// )
