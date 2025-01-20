"use client"
import { useSession } from "next-auth/react";
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "../components/nav-main"
import { NavProjects } from "../components/nav-projects"
import { NavUser } from "../components/nav-user"
import { TeamSwitcher } from "../components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "First last nama ",
    email: "a.example@domain.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "App Rosetta",
      logo: GalleryVerticalEnd,
      plan: "UCAM",
    },
    {
      name: "Catalyst",
      logo: Frame,
      plan: "UCAM",
    },
    
  ],
  navMain: [
    {
      title: "Students",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    }
  ],
 
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();
  
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={session? session?.user : data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
