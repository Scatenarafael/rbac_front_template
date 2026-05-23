import { useMutationCallback } from "@/features/utils";
import { approveInvite, createTenant, deleteTenant, rejectInvite } from "./tenants.service";



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

interface UseCreateTenantMutationProps {
    onSuccessCallback?: () => void;
}

export function useCreateTenantMutation({ onSuccessCallback }: UseCreateTenantMutationProps) {
    return useMutationCallback({
        mutationFnCallback: createTenant,
        onSuccess: () => {
            console.log("Tenant created successfully")
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        mutationActionProps: {
            success: {
                message: "Tenant created successfully",
                refreshQueryKey: ["me-query"],
                redirectTo: null
            },
        },
    })
}

export function useDeleteTenantMutation({ onSuccessCallback }: UseCreateTenantMutationProps) {
    return useMutationCallback({
        mutationFnCallback: deleteTenant,
        onSuccess: () => {
            console.log("Tenant deleted successfully")
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        mutationActionProps: {
            success: {
                message: "Tenant deleted successfully",
                refreshQueryKey: ["me-query"],
                redirectTo: null
            },
        },
    })
}