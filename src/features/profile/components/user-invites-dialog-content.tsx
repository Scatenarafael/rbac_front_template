import { DialogContent } from "@/components/ui/dialog";
import { useUserInvitesQuery } from "../api/profile.queries";
import { StatusBadge } from "@/components/status-badge";

interface UserInvitesDialogContentProps {
    open: boolean
}

export function UserInvitesDialogContent({ open }: UserInvitesDialogContentProps) {
    const { data: userInvites, isLoading } = useUserInvitesQuery(open)

    return (
        <DialogContent className="bg-card w-screen max-w-2xl">
            <p className="text-center font-bold">User Invites</p>
            {isLoading && <p>Loading...</p>}
            {userInvites?.map((invite) => (
                <div key={invite.id} className="border-2 flex justify-between items-center rounded-md bg-card-foreground/20 p-2">
                    <span>{invite.tenant.name}</span>
                    <span> {StatusBadge[invite.status]}</span>
                </div>
            ))}
        </DialogContent>
    )
}
