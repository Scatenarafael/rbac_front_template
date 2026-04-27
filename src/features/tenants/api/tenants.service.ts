import { api } from "@/lib/http/api";
import { routes } from "../Tenants.Routes";
import type { InvitesResponse } from "../types";
import type { Paginated } from "@/features/types";


export async function getInvitesByTenant(tenantId: string, page: number, perPage: number) {
    const response = await api.get<Paginated<InvitesResponse>>(routes.invitesByTenant(tenantId), {
        params: { page, per_page: perPage }
    });
    return response.data;
}


export async function approveInvite(inviteId: string) {
    await api.post(routes.approveInvite(inviteId));
}

export async function rejectInvite(inviteId: string) {
    await api.post(routes.rejectInvite(inviteId));
}