
import { DataTable } from "@/components/data-table"
import { useProfileTenantRoles } from "../hooks/useProfileTenantRoles"
import { useContext } from "react"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"




export function TenantsPage() {
    const {profile, profileRefetch} = useContext( AuthContext )
    const { columns, data } = useProfileTenantRoles()

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
        </div>
    )
}
