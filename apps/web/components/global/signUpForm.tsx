"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { LucideLoader2, Mail, Lock, AlertCircle, Check } from "lucide-react";

import { useAuth } from "@/lib/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import OtpForm from "./OtpForm";

// Define the form schema with validation
const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const { isLoading, isVerifying, signup, handleVerify, googleLogin } =
    useAuth();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await signup({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  // Render verification form if in verification state
  if (isVerifying) {
    return <OtpForm />;
  }

  // Render sign up form by default
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-opacity-50 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription>
          Enter your details to create your account
        </CardDescription>
      </CardHeader>

      <div className="px-6 pb-6">
        {error && (
          <div className="mb-5 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 animate-in fade-in-50 duration-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="you@example.com"
                        className="pl-10 transition-all duration-200 focus-within:border-primary"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 transition-all duration-200 focus-within:border-primary"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <div className="mt-2 space-y-1">
                    <PasswordStrengthIndicator password={field.value} />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 transition-all duration-200 focus-within:border-primary"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:opacity-90 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>

        {/* <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div> */}

        {/* <Button
          variant="outline"
          className="w-full transition-all duration-300 hover:shadow-sm"
          onClick={googleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </>
          )}
        </Button> */}

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline transition-colors duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </Card>
  );
};

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  // Calculate password strength
  const getStrength = (password: string) => {
    let score = 0;
    if (!password) return score;

    // Award points for length
    if (password.length >= 8) score += 1;

    // Award points for complexity
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return score;
  };

  const strength = getStrength(password);
  const percentage = (strength / 5) * 100;

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            percentage <= 20
              ? "bg-destructive"
              : percentage <= 40
                ? "bg-orange-500"
                : percentage <= 60
                  ? "bg-yellow-500"
                  : percentage <= 80
                    ? "bg-lime-500"
                    : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
        <div
          className={`flex items-center gap-1 ${/[A-Z]/.test(password) ? "text-green-500" : "text-muted-foreground"}`}
        >
          {/[A-Z]/.test(password) ? <Check className="h-3 w-3" /> : null}{" "}
          Uppercase
        </div>
        <div
          className={`flex items-center gap-1 ${/[a-z]/.test(password) ? "text-green-500" : "text-muted-foreground"}`}
        >
          {/[a-z]/.test(password) ? <Check className="h-3 w-3" /> : null}{" "}
          Lowercase
        </div>
        <div
          className={`flex items-center gap-1 ${/[0-9]/.test(password) ? "text-green-500" : "text-muted-foreground"}`}
        >
          {/[0-9]/.test(password) ? <Check className="h-3 w-3" /> : null} Number
        </div>
        <div
          className={`flex items-center gap-1 ${password.length >= 8 ? "text-green-500" : "text-muted-foreground"}`}
        >
          {password.length >= 8 ? <Check className="h-3 w-3" /> : null} 8+
          Characters
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
