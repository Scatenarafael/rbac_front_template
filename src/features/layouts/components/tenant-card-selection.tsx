
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AuthContext } from "@/features/auth/contexts/auth-context-types";
import { RoleMapper } from "@/features/auth/types";
import { ListChevronsUpDown } from "lucide-react";
import { useContext } from "react";


export function TenantCardSelection() {
    const {profile, handleTenantChange, selectedUserTenantRole} = useContext(AuthContext)


    return (
        <Collapsible className="px-0.5 py-2 bg-card-foreground/20 rounded-lg">
            <div className="flex gap-2 justify-between items-center p-2">
                <div className="*:p-0 flex items-center gap-1 *:text-start">
                    <p className="text-sm">{selectedUserTenantRole?.tenant.name || ""}</p>
                    <span className="text-xs" >-</span>
                    <p className="text-[11px]">{RoleMapper[selectedUserTenantRole?.role.name || "member"]}</p>
                </div>
                <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm"><ListChevronsUpDown /></Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="flex max-h-32 flex-col overflow-y-auto scrollbar-hide">
                    {
                        profile?.user_tenant_roles?.map((tenantRoles) => {
                            return (
                                <Button 
                                    key={tenantRoles.tenant.id} 
                                    type="button" 
                                    variant="ghost"
                                    onClick={() => handleTenantChange(tenantRoles.tenant.id)}
                                    className="bg-background flex gap-2 items-center"
                                >
                                    <span className="text-xs">{tenantRoles.tenant.name}</span>
                                    <span className="text-xs">-</span>
                                    <span className="text-[10px]">{RoleMapper[tenantRoles.role.name || "member"]}</span> 
                                </Button>
                            )
                        })
                    }
            </CollapsibleContent>
        </Collapsible>
    )
}
// <div className='w-50 p-0 rounded-md bg-card-foreground/20 flex gap-2 items-center justify-between'>
//     <DropdownMenu>
//         <DropdownMenuTrigger className="flex-1 cursor-pointer p-2 flex gap-3 justify-center items-center">
//                 <div className="*:p-0 *:text-start">
//                     <h2 className="text-sm">{selectedUserTenantRole?.tenant.name || "Tenant teste"}</h2>
//                     <p className="text-xs">{RoleMapper[selectedUserTenantRole?.role.name || "member"]}</p>
//                 </div>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-card max-w-8 flex flex-col *:justify-start *:w-full *:rounded-sm *:hover:bg-card-foreground/20 *:cursor-pointer *:p-2 *:text-sm" sideOffset={10} side="right">
//             {
//                 profile?.user_tenant_roles?.map((tenantRoles) => {
//                     return (
//                         <Button 
//                             key={tenantRoles.tenant.id} 
//                             type="button" 
//                             variant="ghost"
//                             onClick={() => handleTenantChange(tenantRoles.tenant.id)}
//                         >
//                             {tenantRoles.tenant.name}
//                         </Button>
//                     )
//                 })
//             }
//         </DropdownMenuContent>
//     </DropdownMenu>
// </div>
