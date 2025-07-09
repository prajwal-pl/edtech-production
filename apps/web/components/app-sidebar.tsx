"use client";

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
  HomeIcon,
  BarChart,
  GraduationCap,
  Briefcase,
  UserIcon,
  Settings,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// EdTech specific data structure
const edtechData = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "EdTech Platform",
      logo: GraduationCap,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: "Learning",
      url: "/learn",
      icon: BookOpen,
    },
    {
      title: "Diagnostic",
      url: "/diagnostic",
      icon: BarChart,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: GraduationCap,
    },
    {
      title: "Career",
      url: "/career",
      icon: Briefcase,
      items: [
        {
          title: "Job Openings",
          url: "/career/job",
        },
        {
          title: "Career",
          url: "/career",
        },
        {
          title: "Career Path",
          url: "/career/resumes",
        },
      ],
    },
    {
      title: "Tutor",
      url: "/tutor",
      icon: UserIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
  projects: [
    {
      name: "Frontend Development",
      url: "/projects/frontend",
      icon: Frame,
    },
    {
      name: "Backend APIs",
      url: "/projects/backend",
      icon: PieChart,
    },
    {
      name: "Full Stack App",
      url: "/projects/fullstack",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Get the navigation data from layout file if available,
  // otherwise use the default edtech data
  const [data, setData] = React.useState(edtechData);

  // This useEffect looks for data passed from the layout component
  // through the window object
  React.useEffect(() => {
    // @ts-ignore - Check if data was passed from layout
    const layoutData = window.__EDTECH_NAV_DATA;
    if (layoutData) {
      setData(layoutData);
    }
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="py-3 flex-shrink-0">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t py-3 flex-shrink-0">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
