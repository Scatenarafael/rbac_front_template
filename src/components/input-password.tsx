import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/features/utils"


type InputPasswordProps = Omit<React.ComponentProps<"input">, "type">

function InputPassword({ className, ...props }: InputPasswordProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <div className="relative">
      <input
        type={isVisible ? "text" : "password"}
        data-slot="input-password"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pr-10 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring border border-foreground/20 focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />

      <button
        type="button"
        className="text-muted-foreground absolute top-0 right-0 flex h-9 w-9 items-center justify-center rounded-r-md transition-colors hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => setIsVisible((currentValue) => !currentValue)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        disabled={props.disabled}
      >
        {isVisible ? (
          <EyeOff className="size-4 cursor-pointer" aria-hidden="true" />
        ) : (
          <Eye className="size-4 cursor-pointer" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export { InputPassword }
