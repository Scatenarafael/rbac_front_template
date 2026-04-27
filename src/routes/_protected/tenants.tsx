import { TenantsRouteComponent } from "@/features/tenants/components/TenantsRouteComponent"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_protected/tenants")({
  component: TenantsRouteComponent,
})
