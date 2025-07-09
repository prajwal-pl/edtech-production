"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Clock, GraduationCap, CheckCircle2 } from "lucide-react";

interface RoleOverviewProps {
  title: string;
  description: string;
  medianSalary: string;
  jobGrowth: string;
  education: string;
  responsibilities: string[];
}

const RoleOverview = ({
  title,
  description,
  medianSalary,
  jobGrowth,
  education,
  responsibilities,
}: RoleOverviewProps) => {
  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>Role Overview</CardTitle>
        <CardDescription>{title}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <DollarSign className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">{medianSalary}</span>
            <span className="text-xs text-muted-foreground">Median Salary</span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">{jobGrowth}</span>
            <span className="text-xs text-muted-foreground">
              Annual Job Growth
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
            <GraduationCap className="h-8 w-8 text-primary mb-2" />
            <span className="text-sm font-medium">{education}</span>
            <span className="text-xs text-muted-foreground">
              Typical Education
            </span>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-medium mb-2">Key Responsibilities</h3>
          <ul className="space-y-2">
            {responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleOverview;
