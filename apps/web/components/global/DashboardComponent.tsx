"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProgressWidget from "./ProgressWidget";
import RecentLessonsWidget from "./RecentLessonsWidget";
import TutorAccessWidget from "./TutorAccessWidget";

interface DashboardComponentProps {
  username: string;
}

const DashboardComponent: React.FC<DashboardComponentProps> = ({
  username,
}) => {
  return (
    <div className="flex flex-col gap-6 py-6 min-h-screen">
      <div className="flex flex-col gap-2 relative px-4 py-8 md:px-8 md:py-10 rounded-2xl mb-4 overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          Welcome back, {username}!
        </h1>
        <p className="text-muted-foreground relative z-10">
          Track your progress, access recent lessons, and connect with tutors.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProgressWidget />
        <RecentLessonsWidget />
        <TutorAccessWidget />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>
              Your learning activity over the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="activity" className="pt-4">
                <div className="aspect-[4/3] w-full rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      Learning activity chart will be displayed here
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="subjects" className="pt-4">
                <div className="text-muted-foreground">
                  Subject progress visualization will be displayed here
                </div>
              </TabsContent>
              <TabsContent value="achievements" className="pt-4">
                <div className="text-muted-foreground">
                  Your learning achievements will be displayed here
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardComponent;
