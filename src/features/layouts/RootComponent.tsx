import { Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import "@/index.css"

export function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <div className="h-screen min-h-0">
          <Outlet />
        </div>
        <Toaster />
        <TanStackRouterDevtools position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  )
}
