import type { InviteStatus } from "@/features/tenants/types"
import { Check, CircleX, ClockFading } from "lucide-react"
import type { ReactNode } from "react"

type StatusBadgeProps = {
  status: InviteStatus
}

const statusBadgeContent: Record<
  InviteStatus,
  {
    label: string
    icon: ReactNode
    className: string
  }
> = {
  approved: {
    label: "Approved",
    icon: <Check />,
    className: "text-green-500",
  },
  pending: {
    label: "Pending",
    icon: <ClockFading />,
    className: "text-yellow-500",
  },
  rejected: {
    label: "Rejected",
    icon: <CircleX />,
    className: "text-red-500",
  },
}

function StatusBadge({ status }: StatusBadgeProps) {
  const content = statusBadgeContent[status]

  return (
    <div
      className={`flex items-center gap-2 rounded-full bg-background px-2 py-1 *:text-xs ${content.className}`}
    >
      <span>{content.label}</span>
      {content.icon}
    </div>
  )
}

export { StatusBadge }
