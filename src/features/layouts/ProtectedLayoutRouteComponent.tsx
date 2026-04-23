import { Outlet } from "@tanstack/react-router"
import { NavMenu } from "./components/nav-menu"
import { Header } from "./components/header"

export function ProtectedLayoutRouteComponent() {

  return (
    <div className="flex flex-col h-full min-h-0">
      <Header />
      <main className="flex min-h-0 flex-1">
        <NavMenu />
        <Outlet />
      </main>
    </div>
  )
}
