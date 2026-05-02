


export const routes = {
    changePassword: (userId: string) => `/users/${userId}`,
    invitesByUser: '/link-user-tenant-requests/',
    tenants: '/tenants/',
    requestEntry: (tenantId: string) => `/link-user-tenant-requests/${tenantId}/request-entry`,
}