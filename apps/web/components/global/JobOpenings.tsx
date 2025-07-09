"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, DollarSign, ChevronRight } from "lucide-react";

interface JobOpening {
  title: string;
  company: string;
  location: string;
  salary: string;
}

interface JobOpeningsProps {
  openings: JobOpening[];
  onApply?: (job: JobOpening) => void;
}

const JobOpenings = ({ openings, onApply }: JobOpeningsProps) => {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Current Job Openings</CardTitle>
        <CardDescription>Latest positions available</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {openings.map((job, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <h3 className="font-medium text-sm">{job.title}</h3>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <Building className="h-3 w-3" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>{job.salary}</span>
            </div>
            <Button
              size="sm"
              className="mt-2 w-full h-7 text-xs"
              onClick={() => onApply && onApply(job)}
            >
              Apply Now
            </Button>
          </div>
        ))}

        <Button variant="outline" className="w-full h-8 text-xs">
          View All Job Openings
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobOpenings;
