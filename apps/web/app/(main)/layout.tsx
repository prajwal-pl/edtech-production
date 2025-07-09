"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  HomeIcon,
  GraduationCap,
  Briefcase,
  BarChart,
  UserIcon,
  Settings,
} from "lucide-react";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

// Custom data for EdTech platform navigation
const navData = {
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
      items: [
        {
          title: "Courses",
          url: "/learn/courses",
        },
        {
          title: "Recommended",
          url: "/learn/recommended",
        },
        {
          title: "Recent Lessons",
          url: "/learn/recent",
        },
      ],
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
          url: "/career/jobs",
        },
        {
          title: "Skills Assessment",
          url: "/career/skills",
        },
        {
          title: "Career Path",
          url: "/career/path",
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
      icon: GraduationCap,
    },
    {
      name: "Backend APIs",
      url: "/projects/backend",
      icon: GraduationCap,
    },
    {
      name: "Full Stack App",
      url: "/projects/fullstack",
      icon: GraduationCap,
    },
  ],
};

const MainLayout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = React.useRef(false);

  // Make data available to AppSidebar component
  React.useEffect(() => {
    // @ts-ignore - This is a workaround to pass data to the AppSidebar component
    window.__EDTECH_NAV_DATA = navData;

    // Check if we're on mobile
    const checkMobile = () => {
      const mobileCheck = window.innerWidth < 768;

      // Update the mobile state ref
      isMobile.current = mobileCheck;

      // Close sidebar by default on mobile, keep open on desktop
      if (mobileCheck) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <SidebarProvider
      defaultOpen={!isMobile.current}
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      className="h-screen overflow-hidden"
      style={
        {
          "--sidebar-width": "16rem",
          "--sidebar-width-collapsed": "4rem",
          "--sidebar-width-mobile": "80vw",
        } as React.CSSProperties
      }
    >
      <div className="flex min-h-screen relative overflow-hidden">
        {/* Toggle button only visible on mobile */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <SidebarTrigger className="bg-background shadow-md rounded-md" />
        </div>

        {/* Overlay that appears on mobile when sidebar is open */}
        {sidebarOpen && isMobile.current && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Custom sidebar configuration based on screen size */}
        <div
          className="fixed md:fixed left-0 top-0 h-screen z-40 flex-shrink-0 transform transition-transform duration-300 ease-in-out"
          style={{
            transform:
              !sidebarOpen && isMobile.current
                ? "translateX(-100%)"
                : "translateX(0)",
            width: isMobile.current
              ? "var(--sidebar-width-mobile)"
              : "var(--sidebar-width)",
          }}
        >
          <AppSidebar
            variant="floating"
            // Only allow collapsing on mobile
            collapsible={isMobile.current ? "icon" : "none"}
            className="mt-14 md:mt-2 ml-2 rounded-xl shadow-lg h-[calc(100vh-16px)] overflow-hidden"
          />
        </div>

        {/* 
          SidebarInset with responsive layout for mobile
          and desktop without fixed margins
        */}
        <SidebarInset
          className="flex-1 overflow-hidden relative"
          style={{
            marginLeft: !isMobile.current ? "var(--sidebar-width)" : "0",
            width: "100%",
          }}
        >
          <div className="p-4 md:p-6 h-full overflow-y-auto overflow-x-hidden w-full">
            <div
              className="w-full transition-all duration-200 ease-in-out"
              style={{
                minWidth: "100%",
                maxWidth: "100%",
              }}
            >
              {children}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
