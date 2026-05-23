


export const routes = {
    invitesByTenant: (tenantId: string) => `/link-user-tenant-requests/${tenantId}`,
    approveInvite: (inviteId: string) => `/link-user-tenant-requests/${inviteId}/approve`,
    rejectInvite: (inviteId: string) => `/link-user-tenant-requests/${inviteId}/reject`,
    createTenant: () => '/tenants',
    deleteTenant: (tenantId: string) => `/tenants/${tenantId}`
}