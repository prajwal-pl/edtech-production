"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import LoginForm from "@/components/global/loginForm";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // const { isLoaded, isSignedIn } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isSignedIn && isLoaded) {
  //     // Redirect to the home page if the user is not signed in
  //     router.push("/dashboard");
  //   }
  // }, [isLoaded, isSignedIn]);

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Left side - Branding/Hero */}
      <div className="hidden w-full max-w-md flex-col justify-between bg-primary p-8 md:flex">
        <div className="flex flex-col text-primary-foreground">
          <h1 className="mb-2 text-3xl font-bold">IntelliLearn</h1>
          <p className="text-lg opacity-80">Learn, grow, and succeed</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/90 italic mb-2">
              "This platform has completely transformed how I approach learning.
              The personalized experience is unlike anything else."
            </p>
            <p className="text-white/70 text-sm">— Sarah, Software Engineer</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-white/20 border border-primary flex items-center justify-center text-xs text-white"
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">
              Join thousands of learners today
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full flex-1 flex-col items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-6 flex justify-center md:hidden">
              <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight md:hidden">
              Welcome to IntelliLearn
            </h1>
            <p className="text-sm text-muted-foreground md:hidden">
              Sign in to continue your learning journey
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
