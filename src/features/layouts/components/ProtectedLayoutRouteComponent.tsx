import { Outlet } from "@tanstack/react-router";


export function ProtectedLayoutRouteComponent() {
    return (
        <div className='flex-1 h-screen flex'>
            <div className="flex flex-col flex-1 h-full">
                <Outlet />
            </div>
        </div>
    )
}