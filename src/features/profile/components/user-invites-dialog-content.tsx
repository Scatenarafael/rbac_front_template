import { DialogContent } from "@/components/ui/dialog";
import { useTenantsQuery, useUserInvitesQuery } from "../api/profile.queries";
import { StatusBadge } from "@/components/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { useContext, useMemo, useState } from "react";
import type { TenantResponse } from "../types";
import { useRequestEntryToTenantMutation } from "../api/profile.mutations";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/features/auth/contexts/auth-context-types";

interface UserInvitesDialogContentProps {
    open: boolean
}


export function UserInvitesDialogContent({ open }: UserInvitesDialogContentProps) {
    const { profile } = useContext(AuthContext)

    function alreadyMemberOfTenant(tenantId: string) {
        return profile?.user_tenant_roles.some((utr) => utr.tenant.id === tenantId)
    }
    
    const { data: userInvites, isLoading } = useUserInvitesQuery(open)

    const requestEntryMutation = useRequestEntryToTenantMutation()
    
    const [search, setSearch] = useState<string | null>(null)

    const sendSearch = useMemo(
        () => { 
            return !!search && open 
        }, 
        [search, open]
    )
    
    const { data: tenants, isLoading: isTenantsLoading } = useTenantsQuery(search, null, null, sendSearch)

    
    return (
        <DialogContent className="bg-card">
            <p className="text-center font-bold">User Invites</p>

            <Combobox items={tenants as TenantResponse[]}>
                <ComboboxInput value={search ?? ""} onChange={(e) => setSearch(e.target.value === "" ? null : e.target.value)} />
                <ComboboxContent>
                    <ComboboxEmpty>No items</ComboboxEmpty>
                    {
                        !isTenantsLoading ? (
                            <ComboboxList>
                                {

                                    (item: TenantResponse) => (
                                        <ComboboxItem key={item.id} value={item.name} className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            
                                            {
                                                alreadyMemberOfTenant(item.id) ? ( <span className="text-[11px] py-1 px-2 rounded-full text-accent bg-emerald-500">Already a member</span> ) : (

                                                    <Button 
                                                        onClick={
                                                            async () => 
                                                            requestEntryMutation.mutateAsync(item.id)
                                                            }
                                                        disabled={requestEntryMutation.isPending}
                                                        className="text-[10px] h-6 text-accent"    
                                                        >Request Entry</Button> 
                                                )
                                            }
                                        </ComboboxItem>
                                    )
                                }
                            </ComboboxList>
                        ) : (
                            [1, 2, 3].map((_, index) => (
                                <Skeleton key={index} className="h-8 w-full rounded-md" />
                            ))
                        )

                    }
                </ComboboxContent>

            </Combobox>


            <div className="space-y-1">
                {
                    isLoading && [1, 2, 3].map((_, index) => (
                        <Skeleton key={index} className="h-12 w-full rounded-md" />
                    ))
                }
                {
                    userInvites?.map((invite) => (
                        <div key={invite.id} className="border-2 flex justify-between items-center rounded-md bg-card-foreground/20 p-2">
                            <span>{invite.tenant.name}</span>
                            <span>
                                <StatusBadge status={invite.status} />
                            </span>
                        </div>
                    ))
                }
            </div>
        </DialogContent>
    )
}
