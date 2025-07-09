"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Award } from "lucide-react";

interface Certification {
  name: string;
  provider: string;
}

interface CertificationsProps {
  certifications: Certification[];
}

const Certifications = ({ certifications }: CertificationsProps) => {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Professional Certifications</CardTitle>
        <CardDescription>Industry-recognized credentials</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 border rounded-lg"
          >
            <Award className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium text-sm">{cert.name}</h3>
              <p className="text-xs text-muted-foreground">{cert.provider}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Certifications;
