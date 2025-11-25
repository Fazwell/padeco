// components/sidebar/app-sidebar.tsx
"use client"

import * as React from "react"
import {
  CreditCard,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings2,
  AudioWaveform,
  Command,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboard,
      // No items → no dropdown arrow, direct link
    },
    {
      title: "Management",
      url: "/dashboard/management", // parent link (optional)
      icon: Settings2,
      items: [
        {
          title: "Create Profile",
          url: "/dashboard/member/",
        },
        {
          title: "Job Postings",
          url: "/dashboard/management/jobs",
        },
        {
          title: "Blog",
          url: "/dashboard/management/blog",
        },
      ],
    },
    {
      title: "Payments",
      url: "/dashboard/payments",
      icon: CreditCard,
      // No items → no dropdown arrow
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Update Profile",
          url: "/dashboard/settings/profile",
        },
        {
          title: "Change Password",
          url: "/dashboard/settings/password",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}