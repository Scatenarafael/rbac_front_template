import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"
import { RoleMapper } from "@/features/auth/types"
import { ChevronDown } from "lucide-react"
import { useContext } from "react"

export function TenantCardSelection() {
  const { profile, handleTenantChange, selectedUserTenantRole } =
    useContext(AuthContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between gap-2 px-2 cursor-pointer">
          <div className="flex items-center gap-1 *:p-0 *:text-start">
            <p className="text-xs">{selectedUserTenantRole?.tenant.name || ""}</p>
            <span className="text-[10px]">-</span>
            <p className="text-[10px]">
              {RoleMapper[selectedUserTenantRole?.role.name || "member"]}
            </p>
          </div>
          <Button variant="ghost" size="sm" className="p-0">
            <ChevronDown />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scrollbar-hide p-0 flex max-h-32 flex-col overflow-y-auto">
        {profile?.user_tenant_roles?.map((tenantRoles) => {
          return (
            <Button
              key={tenantRoles.tenant.id}
              type="button"
              variant="ghost"
              onClick={() => handleTenantChange(tenantRoles.tenant.id)}
              className="flex items-center gap-2 bg-background"
            >
              <span className="text-xs">{tenantRoles.tenant.name}</span>
              <span className="text-xs">-</span>
              <span className="text-[10px]">
                {RoleMapper[tenantRoles.role.name || "member"]}
              </span>
            </Button>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
