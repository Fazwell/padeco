// app/dashboard/layout.tsx
// ← NO "use client" needed → stays a pure Server Component
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background">
          <div className="flex w-full items-center">
            {/* Sidebar Trigger */}
            <div className="flex h-full items-center px-4">
              <SidebarTrigger className="h-9 w-9 rounded-lg p-0 hover:bg-accent transition-colors" />
            </div>

            {/* Breadcrumb with plain <a> */}
            <div className="flex flex-1 items-center gap-3 border-l pl-4">
              <Breadcrumb>
                <BreadcrumbList className="text-sm">
                  <BreadcrumbItem className="hidden md:block">
                    {/* Plain <a> → no prefetch, no errors, works everywhere */}
                    <a
                      href="/dashboard"
                      className="text-foreground/70 hover:text-foreground transition-colors"
                    >
                      Dashboard
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-medium">
                      Members
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}