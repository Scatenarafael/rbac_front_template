import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import type { IProfileProps } from "@/features/auth/types/auth-types"
import { ChangePasswordDialogContent } from "./change-password-dialog-content"

interface IProfilePage {
  profile: IProfileProps
}

export function ProfilePage({ profile }: IProfilePage) {

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Profile Page</h1>
            <div className="flex flex-col justify-center items-center gap-16 p-4 bg-card rounded-md h-full">
                <div className="">
                    <Avatar className="w-32 h-32">
                        <AvatarImage
                            src="https://github.com/Scatenarafael.png"
                            alt="@Scatenarafael"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-2 border-2 rounded-xl w-full max-w-96 p-4">
                    <p>
                        <span className="font-medium">Name: </span> 
                        {profile.first_name}{" "}
                        {profile.last_name}
                    </p>
                    <p>
                        <span className="font-medium">E-mail:</span>
                        {" "}
                        {profile.email}
                    </p>
                    <div className="space-y-2 w-full">
                        <p className="font-bold text-center">Tenants</p>
                        {
                            profile.user_tenant_roles.map((utr) => (
                                <div key={utr.id} className="border-2 rounded-full flex justify-around items-center gap-4">
                                    <span>{utr.tenant.name}</span>
                                    <span>{utr.role.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">Edit Password</Button>
                        </DialogTrigger>
                        <ChangePasswordDialogContent user_id={profile.id} />
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
