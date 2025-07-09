import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RecentLessonsWidget = () => {
  const recentLessons = [
    {
      id: 1,
      title: "Quadratic Equations",
      subject: "Mathematics",
      progress: "Completed",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Forces and Motion",
      subject: "Science",
      progress: "In Progress",
      date: "1 day ago",
    },
    {
      id: 3,
      title: "Essay Writing",
      subject: "Language Arts",
      progress: "Not Started",
      date: "Just added",
    },
  ];

  const getBadgeVariant = (progress: string) => {
    switch (progress) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Not Started":
        return "outline";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-base">Recent Lessons</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {recentLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col gap-1.5 p-4 transition-all cursor-pointer hover:bg-accent/30 border-b last:border-b-0 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-transparent group-hover:to-primary/5 transition-all duration-500"></div>
              <div className="flex items-center justify-between">
                <span className="font-medium">{lesson.title}</span>
                <Badge
                  variant={getBadgeVariant(lesson.progress)}
                  className="transition-all duration-300 group-hover:scale-110"
                >
                  {lesson.progress}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span
                    className={`size-1.5 rounded-full ${
                      lesson.subject === "Mathematics"
                        ? "bg-chart-1"
                        : lesson.subject === "Science"
                          ? "bg-chart-2"
                          : lesson.subject === "Language Arts"
                            ? "bg-chart-3"
                            : "bg-chart-4"
                    }`}
                  ></span>
                  {lesson.subject}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lesson.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentLessonsWidget;
