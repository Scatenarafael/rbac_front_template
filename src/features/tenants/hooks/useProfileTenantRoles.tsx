import { AuthContext } from "@/features/auth/contexts/auth-context-types"
import type { ColumnDef } from "@tanstack/react-table"
import { useCallback, useContext, useMemo, useState } from "react"
import { ROLE, type InvitesResponse } from "../types"
import { Button } from "@/components/ui/button"
import { MailPlus } from "lucide-react"
import { useInvitesByTenantQuery } from "../api/tenants.query"
import type { DefaultPageSizeOption, Paginated } from "@/features/types"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { useApproveInviteMutation, useRejectInviteMutation } from "../api/tenants.mutations"


type TenantRole = {
    userTenantId: string
    tenantId: string
    tenantName: string
    roleName: string
}

interface UseProfileTenantRolesResult {
    columns: ColumnDef<TenantRole>[]
    data: TenantRole[]
    handlePageChange: (newPage: number) => void
    handlePerPageChange: (newPerPage: DefaultPageSizeOption) => void
    page: number
    perPage: DefaultPageSizeOption
    invites: Paginated<InvitesResponse> | undefined
    isInvitesLoading: boolean
    isInvitesFetching: boolean
    refetchInvites: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Paginated<InvitesResponse>, Error>>
    inviteColumns: ColumnDef<InvitesResponse>[]
    invitesFrom: string | null
    pageIndex?: number
    pageSize?: number
}


export function useProfileTenantRoles(): UseProfileTenantRolesResult {
    const { profile } = useContext( AuthContext )
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState<DefaultPageSizeOption>(20)
    const [invitesFrom, setInvitesFrom] = useState<string | null>(null)

    const {
        data: invites, 
        isLoading: isInvitesLoading, 
        isFetching: isInvitesFetching, 
        refetch: refetchInvites 
    } = useInvitesByTenantQuery(invitesFrom ?? "", page, perPage)


    const approveMutation = useApproveInviteMutation(invitesFrom ?? "", page, perPage)
    const rejectMutation = useRejectInviteMutation(invitesFrom ?? "", page, perPage)



    const handleInvitesClick = useCallback((tenantId: string) => {
        if (!profile) return

        const hasTenant = profile.user_tenant_roles.some(
            (utr) => utr.tenant.id === tenantId
        )

        if (!hasTenant || invitesFrom === tenantId) return

        setInvitesFrom(tenantId)
    }, [profile, invitesFrom])

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage)
    }, [])

    const handlePerPageChange = useCallback((newPerPage: DefaultPageSizeOption) => {
        setPerPage(newPerPage)
    }, [])

    const data = useMemo<TenantRole[]>(() => {
        if (!profile) return []
        return profile.user_tenant_roles.map((utr) => ({
            userTenantId: utr.id,
            tenantId: utr.tenant.id,
            tenantName: utr.tenant.name,
            roleName: utr.role.name,
        }))
    }, [profile])


    const columns = useMemo<ColumnDef<TenantRole>[]>(
        () => [
            {
                accessorKey: "tenantName",
                header: "Tenant",
            },
            {
                accessorKey: "roleName",
                header: "Role",
                cell: ({ row }) => (
                    <span className="rounded-full bg-card-foreground/20 px-2 py-1 text-xs font-medium">
                        {ROLE[row.original.roleName]}
                    </span>
                ),
            },
            {
                id: "actions",
                header: "",
                enableGlobalFilter: false,
                enableSorting: false,
                cell: ({ row }) => (
                    <div className="flex justify-end gap-2">
                        {
                            row.original.roleName === "tenantadmin" && (
                                <Button
                                    type="button"
                                    aria-label={`Ver convites de ${row.original.tenantName}`}
                                    className="h-6"
                                    variant="outline"
                                    disabled={invitesFrom === row.original.tenantId && isInvitesFetching}
                                    onClick={() => handleInvitesClick(row.original.tenantId)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>Invites</span>
                                        <MailPlus />
                                    </div>
                                </Button>
                            )
                        }
                    </div>
                ),
            }
        ],
        [handleInvitesClick, invitesFrom, isInvitesFetching]
    )

    const inviteColumns = useMemo<ColumnDef<InvitesResponse>[]>(
        () => [
            {
                accessorKey: "user",
                header: "User",
                cell: ({ row }) => {
                    const user = row.original.user
                    return (
                        <div className="flex flex-col gap-2">
                            <span>{user.first_name} {user.last_name}</span>
                            <span className="text-sm text-muted-foreground">{user.email}</span>
                        </div>
                    )
                },
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.status
                    const statusColor = status === "approved" ? "bg-green-100 text-green-800" :
                        status === "pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"

                    return (
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${statusColor}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    )
                },
            },
            {
                id: "inviteActions",
                header: "",
                enableGlobalFilter: false,
                enableSorting: false,
                cell: ({ row }) => {
                    // const invite = row.original
                    return (
                        <div className="flex justify-end gap-2">
                            {
                                row.original.status === "pending" && (
                                    <>
                                        <Button 
                                            onClick={async () => await approveMutation.mutateAsync(String(row.original.id))} 
                                            variant="default" 
                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                            size="sm"
                                            >
                                            approve
                                        </Button>
                                        <Button 
                                            onClick={async () => await rejectMutation.mutateAsync(String(row.original.id))} 
                                            variant="destructive" 
                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                            size="sm"
                                            >
                                            reject
                                        </Button>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            },
        ],
        [approveMutation, rejectMutation]
    )

    return { 
        columns, 
        data,
        handlePageChange,
        handlePerPageChange,
        page,
        perPage,
        invites,
        isInvitesLoading,
        isInvitesFetching,
        refetchInvites,
        inviteColumns,
        invitesFrom,
        pageIndex: page - 1,
        pageSize: perPage,
    }
}
