import { createContext, type Dispatch, type SetStateAction } from "react"
import { useMeQuery } from "../api/auth.queries"
import type { IProfileProps, UserTenantRolesDetails } from "../types/auth-types"

type AuthContextReturns = {
  profile: IProfileProps | null
  isLoadingProfile: boolean
  profileRefetch: ReturnType<typeof useMeQuery>["refetch"]
  showNavMenu: boolean
  setShowNavMenu: Dispatch<SetStateAction<boolean>>
  selectedUserTenantRole: UserTenantRolesDetails | null
  handleTenantChange: (tenantId: string | null) => void
}

export const AuthContext = createContext({} as AuthContextReturns)
