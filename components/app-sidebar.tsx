"use client"

import * as React from "react"
import {
  GraduationCap,
  Calendar1,
  Settings2,
  SquareTerminal,
  Bug,
  Users,
  Mail,
} from "lucide-react";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { LogoDisp } from "@/components/logo-disp";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "guest",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "overview",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Grades",
      url: "",
      icon: GraduationCap,
      items: [
        {
          title: "Current",
          url: "/grades/current",
        },
        {
          title: "semester",
          url: "/grades/semester",
        },
        {
          title: "year",
          url: "/grades/year",
        },
      ],
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar1,
      items: [
        {
          title: "NotYetImplemented1",
          url: "#",
        },
        {
          title: "NotYetImplemented2",
          url: "#",
        },
      ],
    },
    {
      title: "Profile",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/profile/general",
        },
        {
          title: "Documents",
          url: "/profile/documents",
        },
        {
          title: "Settings",
          url: "/profile/settings",
        },
      ],
    },
  ],
  dev: [
    {
      name: "Report an Issue",
      url: "#",
      icon: Bug,
    },
    {
      name: "Get Involved",
      url: "#",
      icon: Users,
    },
    {
      name: "Contact Us",
      url: "#",
      icon: Mail,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoDisp />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.dev} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
