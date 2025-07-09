"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface CustomModeToggleProps {
  className?: string;
}

export function CustomModeToggle({ className }: CustomModeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`${className} p-6 rounded-lg border bg-card shadow-sm`}>
      <h3 className="font-medium text-lg mb-2">Appearance Theme</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Choose how you want the application to appear
      </p>

      <div className="grid grid-cols-3 gap-3">
        <div
          className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border-2 ${theme === "light" ? "border-primary bg-primary/10" : "border-muted"}`}
          onClick={() => setTheme("light")}
        >
          <Sun className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Light</span>
        </div>

        <div
          className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border-2 ${theme === "dark" ? "border-primary bg-primary/10" : "border-muted"}`}
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-8 w-8 mb-2" />
          <span className="text-sm font-medium">Dark</span>
        </div>

        <div
          className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-lg border-2 ${theme === "system" ? "border-primary bg-primary/10" : "border-muted"}`}
          onClick={() => setTheme("system")}
        >
          <div className="h-8 w-8 mb-2 flex items-center justify-center">
            <Sun className="h-5 w-5 mr-1" />
            <Moon className="h-5 w-5 ml-1" />
          </div>
          <span className="text-sm font-medium">System</span>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-4">
        {theme === "light"
          ? "Light mode uses a bright color scheme that's easier to see in daylight."
          : theme === "dark"
            ? "Dark mode uses a darker color scheme that reduces eye strain in low-light environments."
            : "System mode automatically follows your device's theme settings."}
      </p>
    </div>
  );
}
