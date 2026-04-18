import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"

function Collapsible({ ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props & {
  asChild?: boolean
}

function CollapsibleTrigger({
  asChild,
  children,
  render,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      render={asChild && React.isValidElement(children) ? children : render}
      {...props}
    >
      {asChild ? undefined : children}
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({ ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel data-slot="collapsible-content" {...props} />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
