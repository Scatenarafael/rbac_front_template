import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AuthContext } from "@/features/auth/contexts/auth-context-types"
import { useContext } from "react"


export function UserInfoCard() {

    const {profile} = useContext(AuthContext)
    
    return (
        <div className='w-50 p-0 rounded-md bg-card-foreground/20 flex gap-2 items-center justify-between'>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex-1 cursor-pointer p-2 flex gap-3 justify-center items-center">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/Scatenarafael.png"
                                alt="@Scatenarafael"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="*:p-0 *:text-xs *:text-start">
                            <h2>{`${profile?.first_name} ${profile?.last_name}`}</h2>
                            <p>{profile?.email || "user@example.com"}</p>
                        </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-card max-w-8 flex flex-col *:justify-start *:w-full *:rounded-sm *:hover:bg-card-foreground/20 *:cursor-pointer *:p-2 *:text-sm" sideOffset={10} side="right">
                    <Button type="button" variant="ghost">Profile</Button>
                    <Button type="button" variant="ghost">Settings</Button>
                    <Button type="button" variant="ghost">Logout</Button>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}