"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: string;
    proficiency: number;
  }[];
}

interface SkillRequirementsProps {
  categories: SkillCategory[];
}

const SkillRequirements = ({ categories }: SkillRequirementsProps) => {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Skill Requirements</CardTitle>
        <CardDescription>
          Technical skills and knowledge needed for this role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="font-medium mb-1 text-sm">{category.name}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">{skill.name}</span>
                      <span className="text-xs">{skill.level}</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillRequirements;
