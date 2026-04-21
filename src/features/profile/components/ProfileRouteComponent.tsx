import { Route } from "@/routes/_protected/profile"
import { ProfilePage } from "./ProfilePage"

export function ProfileRouteComponent() {
  const { profile } = Route.useLoaderData()

  return <ProfilePage profile={profile} />
}
