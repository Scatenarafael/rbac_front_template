// src/features/users/types.ts
export type SignInPayload = {
  email: string
  password: string
}


export type SignUpPayload = {
  first_name: string
  last_name: string
  email: string
  password: string
  active: boolean
}

export type RegisteredUserResponse = {
    id: string
    first_name: string
    last_name: string
    email: string
    active: boolean
    created_at: string
    }

export const RoleMapper: Record<string, string> = {
    tenantadmin: "Manager",
    member: "Member"
}