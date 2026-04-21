import { MeQuery } from "@/features/auth/api/auth.queries"
import { ProfileRouteComponent } from "@/features/profile/components/ProfileRouteComponent"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protected/profile")({
  loader: async ({ context: { queryClient } }) => {
    const profile = await queryClient.ensureQueryData(MeQuery)

    return {
      profile: profile.data,
    }
  },
  component: ProfileRouteComponent,
})
