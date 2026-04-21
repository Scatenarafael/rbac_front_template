import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"
import { RoleMapper } from "@/features/auth/types"
import { ListChevronsUpDown } from "lucide-react"
import { useContext } from "react"

export function TenantCardSelection() {
  const { profile, handleTenantChange, selectedUserTenantRole } =
    useContext(AuthContext)

  return (
    <Collapsible className="rounded-lg bg-card-foreground/20 px-0.5 py-2">
      <div className="flex items-center justify-between gap-2 p-2">
        <div className="flex items-center gap-1 *:p-0 *:text-start">
          <p className="text-sm">{selectedUserTenantRole?.tenant.name || ""}</p>
          <span className="text-xs">-</span>
          <p className="text-[11px]">
            {RoleMapper[selectedUserTenantRole?.role.name || "member"]}
          </p>
        </div>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            <ListChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="scrollbar-hide flex max-h-32 flex-col overflow-y-auto">
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
      </CollapsibleContent>
    </Collapsible>
  )
}
