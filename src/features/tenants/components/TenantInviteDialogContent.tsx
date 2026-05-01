import { DataTable } from "@/components/data-table";
import { DialogContent } from "@/components/ui/dialog";
import { useProfileTenantRoles } from "../hooks/useProfileTenantRoles";
import { AuthContext } from "@/features/auth/contexts/auth-context-types";
import { useContext } from "react";



export function TenantInviteDialogContent() {
    const {profile, profileRefetch} = useContext( AuthContext )
    const { inviteColumns, invites, invitesFrom, handlePageChange, handlePerPageChange, pageIndex, pageSize } = useProfileTenantRoles()
    
    
    if (!profile) {
        profileRefetch()
    }


    return (
        <DialogContent className="min-w-4xl">
             <h2 className="text-xl font-semibold">Invites from {profile?.user_tenant_roles.filter((utr) => utr.tenant.id === invitesFrom)[0]?.tenant.name}</h2>
            <DataTable
                columns={inviteColumns}
                data={invites?.results || [] }
                emptyMessage="Nenhum convite encontrado."
                filterPlaceholder="Buscar convites..."
                pageIndex={pageIndex}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPerPageChange={handlePerPageChange}
            />
        </DialogContent>
    )
}