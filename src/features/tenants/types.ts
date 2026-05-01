

export type UserFromInvites = {
        id: string,
        first_name: string,
        last_name: string,
        email: string
}

export type InviteStatus = "approved" | "pending" | "rejected"

export type InvitesResponse = {
    id: string,
    user: UserFromInvites,
    status: InviteStatus,
    updated_at: string
}

export type UserInvitesResponse = {
    id: string,
    tenant: {
        id: string,
        name: string
    },
    status: InviteStatus,
    updated_at: string
}


export const ROLE: Record<string, string> = {
    tenantadmin: "Admin",
    member: "Member"
}