
import { Link } from "@tanstack/react-router";
import { UserInfoCard } from "./user-info-card";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/contexts/auth-context-types";
import { Settings, User } from "lucide-react";

export function NavMenu() {
    const { showNavMenu, setShowNavMenu } = useContext(AuthContext)
    return (
        <div
            data-show-nav-menu={showNavMenu}
            className="group data-[show-nav-menu=false]:max-w-12 data-[show-nav-menu=true]:p-4 max-w-60 py-4 p-0 shadow-black shadow-lg flex-1  bg-background flex flex-col justify-between gap-4"
            onMouseEnter={() => setShowNavMenu(true)}
            onMouseLeave={() => setShowNavMenu(false)}
            >
            <ul className="space-y-4 h-full py-2">
                <li className="cursor-pointer text-sm">
                    <Link to="/" className="*:mx-auto">
                        <span className="group-data-[show-nav-menu=false]:hidden">
                            Users
                        </span>
                        <User className="group-data-[show-nav-menu=true]:hidden p-0" />
                    </Link>
                </li>

                <li className="cursor-pointer text-sm">
                    <Link to="/" className="*:mx-auto">
                        <span className="group-data-[show-nav-menu=false]:hidden">
                            Settings
                        </span>
                        <Settings className="group-data-[show-nav-menu=true]:hidden p-0" />
                    </Link>
                </li>
            </ul>

            <UserInfoCard />
        </div>

    )
}