import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TutorAccessWidget = () => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base">Tutor Access</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-primary/5 cursor-pointer group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:to-primary/10 rounded-lg transition-all duration-500"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/30 group-hover:from-primary/30 group-hover:to-primary/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="flex flex-col z-10">
              <span className="font-medium group-hover:text-primary transition-colors duration-300">
                AI Tutor
              </span>
              <span className="text-xs text-muted-foreground">
                Available 24/7
              </span>
            </div>
            <div className="relative ml-auto">
              <div className="flex h-3 w-3 rounded-full bg-green-500 group-hover:animate-pulse"></div>
              <div className="absolute inset-0 h-3 w-3 rounded-full bg-green-500 opacity-40 animate-ping"></div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-secondary/10 cursor-pointer group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:to-secondary/10 rounded-lg transition-all duration-500"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-secondary/30 group-hover:from-secondary/30 group-hover:to-secondary/40 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(var(--secondary),0.2)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-secondary-foreground"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="flex flex-col z-10">
              <span className="font-medium group-hover:text-secondary-foreground transition-colors duration-300">
                Human Tutors
              </span>
              <span className="text-xs text-muted-foreground">
                3 sessions remaining
              </span>
            </div>
            <div className="relative ml-auto">
              <div className="flex h-3 w-3 rounded-full bg-amber-500"></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-4 px-4">
        <Button
          variant="default"
          className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300 hover:shadow-md"
          onClick={() => (window.location.href = "/tutor")}
        >
          Chat with a Tutor
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TutorAccessWidget;
