
import { Link } from "@tanstack/react-router";
import { UserInfoCard } from "./user-info-card";

export function NavMenu() {
    return (
        <div className='max-w-60 shadow-black shadow-lg flex-1 p-4 bg-background flex flex-col justify-between gap-4'>
            <div className="space-y-10">
                <ul className='space-y-4'>
                    <li className="cursor-pointer text-sm"><Link to="/tenants">Tenants</Link></li> 
                    <li className="cursor-pointer text-sm"><Link to="/">Users</Link></li> 
                    <li className="cursor-pointer text-sm"><Link to="/">Settings</Link></li> 
                </ul>
            </div>

            <UserInfoCard />
        </div>
    )
}