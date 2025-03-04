"use client";
import { useSession } from "next-auth/react";
import * as React from "react";
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
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";

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
      title: "Gestion Students",
      url: "/Gestion Students",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "students",
          url: "/students",
        },
        {
          title: "Results",
          url: "/Results",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
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
        <NavUser user={session ? session.user : data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
