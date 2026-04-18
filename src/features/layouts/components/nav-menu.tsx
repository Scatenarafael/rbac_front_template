import { UserInfoCard } from "./user-info-card";
import { TenantCardSelection } from "./tenant-card-selection";


export function NavMenu() {

    return (
        <div className='max-w-60 shadow-black shadow-lg flex-1 p-4 bg-background flex flex-col justify-between gap-4'>
            <div className="space-y-10">
                <TenantCardSelection />          

                <ul className='space-y-4'>
                    <li><p className='text-sm'>Dashboard</p></li> 
                    <li><p className='text-sm'>Users</p></li> 
                    <li><p className='text-sm'>Settings</p></li> 
                </ul>
            </div>

            <UserInfoCard />
        </div>
    )
}