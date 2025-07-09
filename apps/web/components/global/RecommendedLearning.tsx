"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface Course {
  title: string;
  description: string;
  duration: string;
}

interface RecommendedLearningProps {
  courses: Course[];
  onStartLearning?: (course: Course) => void;
}

const RecommendedLearning = ({
  courses,
  onStartLearning,
}: RecommendedLearningProps) => {
  return (
    <Card className="h-auto">
      <CardHeader className="pb-3">
        <CardTitle>Recommended Learning</CardTitle>
        <CardDescription>
          Courses to help you succeed in this role
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 pb-2">
        {courses.map((course, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">{course.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {course.description}
            </p>
            <div className="flex items-center justify-between mt-1">
              <Badge variant="outline" className="text-xs h-5 px-1.5">
                {course.duration}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                className="h-6 text-xs"
                onClick={() => onStartLearning && onStartLearning(course)}
              >
                Start Learning
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full h-7 text-xs">
          View All Courses
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedLearning;
