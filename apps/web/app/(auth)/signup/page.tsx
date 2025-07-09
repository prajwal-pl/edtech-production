"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import SignUpForm from "@/components/global/signUpForm";
import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  // const { isLoaded, isSignedIn, session } = useSession();
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
          <p className="text-lg opacity-80">Start your learning journey</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-white/90 italic mb-2">
              "Join our community of learners and unlock your potential with
              personalized learning paths and expert guidance."
            </p>
            <p className="text-white/70 text-sm">— Michael, Lead Instructor</p>
          </div>

          <div className="space-y-2">
            <p className="text-white/90 text-sm font-medium">
              What you'll get:
            </p>
            <ul className="space-y-1">
              {[
                "Personalized learning paths",
                "Expert-led courses",
                "Project-based learning",
                "Career guidance",
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-white/70 text-sm flex items-center gap-2"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-white/70"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Right side - Sign Up Form */}
      <div className="flex w-full flex-1 flex-col items-center justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-6 flex justify-center md:hidden">
              <div className="bg-primary h-12 w-12 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight md:hidden">
              Join IntelliLearn
            </h1>
            <p className="text-sm text-muted-foreground md:hidden">
              Create your account and start learning today
            </p>
          </div>

          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
