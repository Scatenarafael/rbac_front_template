import { cn } from "@/features/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-2xl bg-muted-foreground/50", className)}
      {...props}
    />
  )
}

export { Skeleton }
