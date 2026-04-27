
import { DataTable } from "@/components/data-table"
import { useProfileTenantRoles } from "../hooks/useProfileTenantRoles"
import { useContext } from "react"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"




export function TenantsPage() {
    const {profile, profileRefetch} = useContext( AuthContext )
    const { columns, data, inviteColumns, invites, invitesFrom } = useProfileTenantRoles()

    if (!profile) {
        profileRefetch()
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Tenants</h1>
            <DataTable
                columns={columns}
                data={data}
                emptyMessage="Nenhum tenant encontrado."
                filterPlaceholder="Buscar tenants..."
                paginate={false}
            />
            {
                invites && invites.results.length > 0 && (
                    <>
                        <h2 className="text-xl font-semibold">Invites from {profile?.user_tenant_roles.filter((utr) => utr.tenant.id === invitesFrom)[0]?.tenant.name}</h2>
                        <DataTable
                            columns={inviteColumns}
                            data={invites.results}
                            emptyMessage="Nenhum convite encontrado."
                            filterPlaceholder="Buscar convites..."
                        />
                    </>
                )
            }
        </div>
    )
}
