"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface CareerStep {
  level: number;
  title: string;
  description: string;
  salaryRange: string;
}

interface CareerProgressionProps {
  steps: CareerStep[];
}

const CareerProgression = ({ steps }: CareerProgressionProps) => {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Career Progression</CardTitle>
        <CardDescription>Typical career path for this role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step) => (
            <div key={step.level} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-sm">
                {step.level}
              </div>
              <div>
                <h3 className="font-medium text-sm">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {step.description}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <DollarSign className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{step.salaryRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CareerProgression;
