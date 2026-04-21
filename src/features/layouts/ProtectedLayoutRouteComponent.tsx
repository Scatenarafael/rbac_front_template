import { Outlet } from "@tanstack/react-router"
import { NavMenu } from "./components/nav-menu"

export function ProtectedLayoutRouteComponent() {

  return (
    <div className="flex h-full min-h-0">
      <NavMenu />
      <main className="flex min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
