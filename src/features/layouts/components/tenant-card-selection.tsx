import { Button } from "@/components/ui/button"
import { Dialog } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"
import { RoleMapper } from "@/features/auth/types"
import { CreateTenantDialogContent } from "@/features/tenants/components/CreateTenantDialogContent"
import { ChevronDown, PencilLine } from "lucide-react"
import { useContext, useState } from "react"


export type EditTenantProps = {
  id: string
  name: string
}

export function TenantCardSelection() {
  const { profile, handleTenantChange, selectedUserTenantRole } =
    useContext(AuthContext)
  const [createTenantOpen, setCreateTenantOpen] = useState(false)
  const [editTenant, setEditTenant] = useState<EditTenantProps | null>(null)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="flex h-auto items-center justify-between gap-2 px-2 py-0"
          >
            <div className="flex items-center gap-1 *:p-0 *:text-start">
              <p className="text-xs">{selectedUserTenantRole?.tenant.name || ""}</p>
              <span className="text-xs">-</span>
              <p className="text-xs">
                {RoleMapper[selectedUserTenantRole?.role.name || "member"]}
              </p>
            </div>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="scrollbar-hide p-0 flex max-h-32 flex-col overflow-y-auto">
          <Button
            type="button"
            className="flex items-center text-xs h-7"
            onClick={() => setCreateTenantOpen(true)}
          >
            Create
          </Button>
          {profile?.user_tenant_roles?.map((tenantRoles) => {
            return (
              <div className="flex items-center justify-between">
                <Button
                  key={tenantRoles.tenant.id}
                  type="button"
                  variant="ghost"
                  onClick={() => handleTenantChange(tenantRoles.tenant.id)}
                  className="flex items-center flex-1 truncate line-clamp-2 gap-2 bg-background hover:bg-accent-foreground/20"
                  >
                  <span className="text-xs">{tenantRoles.tenant.name}</span>
                  <span className="text-xs">-</span>
                  <span className="text-[10px]">
                    {RoleMapper[tenantRoles.role.name || "member"]}
                  </span>
                </Button>

                <Button 
                  variant="ghost"
                  className="flex items-center gap-2 w-1/6 bg-background hover:bg-accent-foreground/20"
                  onClick={() => {setEditTenant({ id: tenantRoles.tenant.id, name: tenantRoles.tenant.name }); setCreateTenantOpen(true)}}
                  >
                    <PencilLine />
                </Button>
              </div>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={createTenantOpen} onOpenChange={setCreateTenantOpen}>
        <CreateTenantDialogContent tenant={editTenant} closeDialogCallback={() => setCreateTenantOpen(false)} />
      </Dialog>
    </>
  )
}
