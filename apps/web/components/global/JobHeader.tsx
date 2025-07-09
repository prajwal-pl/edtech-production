"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface JobHeaderProps {
  title: string;
  description: string;
}

const JobHeader = ({ title, description }: JobHeaderProps) => {
  return (
    <>
      <div className="flex items-center gap-2 mb-4 text-sm">
        <Link
          href="/career/job"
          className="flex items-center hover:underline text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Job Roles
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/career/applications")}
          >
            Track Applications
          </Button>
          <Button size="sm">
            <Briefcase className="mr-1 h-4 w-4" />
            Apply for Jobs
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobHeader;
