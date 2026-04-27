import { useMutationCallback } from "@/features/utils";
import { approveInvite, rejectInvite } from "./tenants.service";



export function useApproveInviteMutation(tenantId: string, page: number, perPage: number) {
    return useMutationCallback({
        mutationFnCallback: approveInvite,
        mutationActionProps: {
            success: {
                message: "Invite approved successfully",
                refreshQueryKey: ["invites-by-tenant-query", tenantId, page, perPage],
                redirectTo: null
            },
        },
    })
}

export function useRejectInviteMutation(tenantId: string, page: number, perPage: number) {
    return useMutationCallback({
        mutationFnCallback: rejectInvite,
        mutationActionProps: {
            success: {
                message: "Invite rejected successfully",
                refreshQueryKey: ["invites-by-tenant-query", tenantId, page, perPage],
                redirectTo: null       
            },
        },
    })
}