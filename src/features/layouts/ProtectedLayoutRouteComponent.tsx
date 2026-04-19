import { Outlet } from "@tanstack/react-router"
import { NavMenu } from "./components/nav-menu"
import { useAuthRefreshInterceptor } from "../auth/hooks/use-auth-refresh-interceptor"

export function ProtectedLayoutRouteComponent() {
  useAuthRefreshInterceptor()

  return (
    <div className="flex h-full min-h-0">
      <NavMenu />
      <main className="flex min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
