import { Outlet } from "@tanstack/react-router";
import { NavMenu } from "./components/nav-menu";
import { AuthProvider } from "../auth/contexts/auth-context";


export function ProtectedLayoutRouteComponent() {

    return (
        <AuthProvider>
            <div className="flex h-full min-h-0">
                <NavMenu />
                <main className="flex flex-1 min-h-0">
                    <Outlet />
                </main>
            </div>
        </AuthProvider>
    )
}
