"use client";

import React, { useState } from "react";
import Container from "@/components/global/Container";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Briefcase,
  ArrowRight,
  TrendingUp,
  Building,
  DollarSign,
  GraduationCap,
  BookOpen,
  Filter,
} from "lucide-react";
import Link from "next/link";

const JobRolesPage = () => {
  const [searchText, setSearchText] = useState("");

  const jobRoles = [
    {
      title: "Full Stack Developer",
      category: "Software Development",
      description:
        "Develops both client and server software, working with databases, APIs, and user interfaces.",
      salary: "$112K median",
      growth: "27% growth",
      url: "/career/job/fullstack-developer",
      tags: ["popular", "technology"],
    },
    {
      title: "Data Scientist",
      category: "Data Science",
      description:
        "Analyzes complex data to extract insights and solve business problems using statistical methods and ML.",
      salary: "$125K median",
      growth: "31% growth",
      url: "/career/job/data-scientist",
      tags: ["popular", "technology", "dataScience"],
    },
    {
      title: "UX Designer",
      category: "Design",
      description:
        "Creates intuitive, user-centered digital experiences through research and design.",
      salary: "$102K median",
      growth: "24% growth",
      url: "/career/job/ux-designer",
      tags: ["popular", "design"],
    },
    {
      title: "Machine Learning Engineer",
      category: "Artificial Intelligence",
      description:
        "Builds and implements machine learning models and systems to solve complex problems.",
      salary: "$130K median",
      growth: "35% growth",
      url: "/career/job",
      tags: ["technology", "dataScience"],
    },
    {
      title: "Cloud Architect",
      category: "Cloud Computing",
      description:
        "Designs and implements cloud infrastructure and solutions for organizations.",
      salary: "$140K median",
      growth: "29% growth",
      url: "/career/job",
      tags: ["technology"],
    },
    {
      title: "DevOps Engineer",
      category: "Operations",
      description:
        "Bridges development and operations, automating deployments and infrastructure.",
      salary: "$120K median",
      growth: "25% growth",
      url: "/career/job",
      tags: ["technology"],
    },
    {
      title: "Frontend Developer",
      category: "Software Development",
      description:
        "Creates the user interface and experience for web applications.",
      salary: "$105K median",
      growth: "23% growth",
      url: "/career/job",
      tags: ["technology"],
    },
    {
      title: "Backend Developer",
      category: "Software Development",
      description:
        "Builds server-side logic, databases, and APIs that power applications.",
      salary: "$110K median",
      growth: "24% growth",
      url: "/career/job",
      tags: ["technology"],
    },
    {
      title: "Data Analyst",
      category: "Data Analysis",
      description:
        "Interprets data sets to identify trends and create visualizations.",
      salary: "$95K median",
      growth: "25% growth",
      url: "/career/job",
      tags: ["dataScience"],
    },
    {
      title: "UI Designer",
      category: "User Interface",
      description:
        "Focuses on the visual elements of user interfaces and design systems.",
      salary: "$95K median",
      growth: "21% growth",
      url: "/career/job",
      tags: ["design"],
    },
    {
      title: "Product Designer",
      category: "Product Development",
      description:
        "Combines UX and UI skills with product strategy to create end-to-end solutions.",
      salary: "$108K median",
      growth: "22% growth",
      url: "/career/job",
      tags: ["design"],
    },
    {
      title: "Interaction Designer",
      category: "User Experience",
      description:
        "Specializes in designing how users interact with digital products.",
      salary: "$100K median",
      growth: "20% growth",
      url: "/career/job",
      tags: ["design"],
    },
  ];

  const filteredJobs =
    searchText.trim() === ""
      ? jobRoles
      : jobRoles.filter(
          (job) =>
            job.title.toLowerCase().includes(searchText.toLowerCase()) ||
            job.description.toLowerCase().includes(searchText.toLowerCase()) ||
            job.category.toLowerCase().includes(searchText.toLowerCase())
        );
  return (
    <Container>
      <div className="py-8 space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Explore Job Roles
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Browse through various STEM career paths and job roles to find
            detailed information about requirements, skills, and growth
            opportunities.
          </p>

          <div className="relative max-w-md mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for job roles..."
              className="pl-10"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="popular">Popular Roles</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="dataScience">Data Science</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>

          {["popular", "technology", "dataScience", "design"].map(
            (tabValue) => (
              <TabsContent
                key={tabValue}
                value={tabValue}
                className="space-y-6 mt-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredJobs
                    .filter((job) => job.tags.includes(tabValue))
                    .map((job, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle>{job.title}</CardTitle>
                            {job.tags.includes("popular") && (
                              <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{job.category}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                              {job.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-green-500">
                                  {job.growth}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Link href={job.url} className="w-full">
                            <Button className="w-full">
                              View Role
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>

                {tabValue === "popular" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Job Opportunities</CardTitle>
                      <CardDescription>
                        Current openings for popular roles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Building className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">
                              Senior Full Stack Developer
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <span>TechCorp Inc.</span>
                              <span>•</span>
                              <span>Remote</span>
                              <span>•</span>
                              <span>$120-150K</span>
                            </div>
                          </div>
                        </div>
                        <Button>Apply Now</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Building className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">
                              Data Scientist, Healthcare
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <span>MedAnalytics Inc.</span>
                              <span>•</span>
                              <span>Boston, MA (Hybrid)</span>
                              <span>•</span>
                              <span>$120-145K</span>
                            </div>
                          </div>
                        </div>
                        <Button>Apply Now</Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Building className="h-8 w-8 text-muted-foreground" />
                          <div>
                            <h3 className="font-medium">
                              UX Designer, Fintech
                            </h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                              <span>FinanceApp Global</span>
                              <span>•</span>
                              <span>New York, NY (Hybrid)</span>
                              <span>•</span>
                              <span>$110-135K</span>
                            </div>
                          </div>
                        </div>
                        <Button>Apply Now</Button>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Job Openings
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </TabsContent>
            )
          )}
        </Tabs>

        <div className="flex justify-center pt-4">
          <div className="p-6 border rounded-lg bg-muted/20 max-w-2xl w-full">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-medium">
                Career Development Resources
              </h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Enhance your career journey with our comprehensive resources
              including interview preparation guides, resume building tools, and
              skill assessment tests.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Interview Guides</Button>
              <Button variant="outline">Resume Builder</Button>
              <Button variant="outline">Skill Assessments</Button>
              <Button variant="outline">Salary Insights</Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default JobRolesPage;
