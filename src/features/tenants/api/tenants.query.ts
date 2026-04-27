import { queryOptions, useQuery } from "@tanstack/react-query";
import { getInvitesByTenant } from "./tenants.service";

export const InvitesByTenantQuery = (tenantId: string, page: number, perPage: number) => {
    return queryOptions({
        queryKey: ["invites-by-tenant-query", tenantId, page, perPage],
        queryFn: () => getInvitesByTenant(tenantId, page, perPage),
    });
};

export function useInvitesByTenantQuery(tenantId: string, page: number, perPage: number) {
    return useQuery(InvitesByTenantQuery(tenantId, page, perPage));
}
