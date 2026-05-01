import type { InviteStatus } from "@/features/tenants/types";
import { Check, CircleX, ClockFading } from "lucide-react";
import type { ReactNode } from "react";




export const StatusBadge: Record<InviteStatus, ReactNode> = {
    approved: <div className="bg-background *:text-xs px-2 py-1 flex gap-2 items-center rounded-full text-green-500"><span>Approved</span> <Check /></div>,
    pending: <div className="bg-background *:text-xs px-2 py-1 flex gap-2 items-center rounded-full text-yellow-500"><span>Pending</span> <ClockFading /></div>,
    rejected: <div className="bg-background *:text-xs px-2 py-1 flex gap-2 items-center rounded-full text-red-500"><span>Rejected</span> <CircleX /></div>
}