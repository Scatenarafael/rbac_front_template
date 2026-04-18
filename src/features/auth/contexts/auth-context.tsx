

import {
  type ReactNode,
  useState,
} from 'react';
import { useMeQuery } from '../api/auth.queries';
import { AuthContext } from './auth-context-types';
import type { UserTenantRolesDetails } from '../types/auth-types';

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [selectedUserTenantRole, setSelectedUserTenantRole] = useState<UserTenantRolesDetails | null>(null);

  const {
    data: profile, 
    isLoading: isLoadingProfile, 
    isFetching: isFetchingProfile, 
    refetch: profileRefetch
  } = useMeQuery()

  function handleTenantChange(tenantId: string | null) {
    if (!profile) return

    const userTenantRole = profile.data.user_tenant_roles.find(utr => utr.tenant.id === tenantId) || null
    setSelectedUserTenantRole(userTenantRole)
  }

  

  return (
    <AuthContext.Provider
      value={{
        profile: profile?.data || null,
        isLoadingProfile: isLoadingProfile || isFetchingProfile,
        profileRefetch,
        setShowNavMenu,
        showNavMenu,
        selectedUserTenantRole,
        setSelectedUserTenantRole,
        handleTenantChange,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
