import { type ReactNode, useMemo, useState } from "react"
import { useMeQuery } from "../api/auth.queries"
import { AuthContext } from "./auth-context-types"

type AuthProviderProps = {
  children: ReactNode
}

const SELECTED_TENANT_ID_STORAGE_KEY = "@selectedTenantId"

function getStoredSelectedTenantId() {
  if (typeof window === "undefined") return null

  return window.localStorage.getItem(SELECTED_TENANT_ID_STORAGE_KEY)
}

function storeSelectedTenantId(tenantId: string | null) {
  if (typeof window === "undefined") return

  if (!tenantId) {
    window.localStorage.removeItem(SELECTED_TENANT_ID_STORAGE_KEY)
    return
  }

  window.localStorage.setItem(SELECTED_TENANT_ID_STORAGE_KEY, tenantId)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [showNavMenu, setShowNavMenu] = useState(false)
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(
    getStoredSelectedTenantId
  )

  const {
    data: profile,
    isLoading: isLoadingProfile,
    isFetching: isFetchingProfile,
    refetch: profileRefetch,
  } = useMeQuery()

  const profileData = profile?.data || null

  const selectedUserTenantRole = useMemo(() => {
    if (!profileData || !selectedTenantId) return null

    return (
      profileData.user_tenant_roles.find(
        (utr) => utr.tenant.id === selectedTenantId
      ) || null
    )
  }, [profileData, selectedTenantId])

  function handleTenantChange(tenantId: string | null) {
    if (!tenantId) {
      storeSelectedTenantId(null)
      setSelectedTenantId(null)
      return
    }

    if (!profileData) return

    const userTenantRole = profileData.user_tenant_roles.find(
      (utr) => utr.tenant.id === tenantId
    )

    if (!userTenantRole) return

    storeSelectedTenantId(tenantId)
    setSelectedTenantId(tenantId)
  }

  return (
    <AuthContext.Provider
      value={{
        profile: profileData,
        isLoadingProfile: isLoadingProfile || isFetchingProfile,
        profileRefetch,
        setShowNavMenu,
        showNavMenu,
        selectedUserTenantRole,
        handleTenantChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

