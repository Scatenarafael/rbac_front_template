import { TenantCardSelection } from "./tenant-card-selection";



export function Header() {
    return (
        <div className="flex-1 flex justify-between items-center max-h-8 border shadow-black shadow-xs px-4">
            <span className="italic">Template</span>
            <TenantCardSelection />
        </div>
    )
}