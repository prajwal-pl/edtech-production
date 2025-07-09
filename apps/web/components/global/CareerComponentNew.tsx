"use client";
import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Briefcase,
  TrendingUp,
  ChevronRight,
  FileText,
  Upload,
  Calendar,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CareerComponentProps {
  username?: string;
}

const CareerComponent: React.FC<CareerComponentProps> = ({ username }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col gap-6 py-6 min-h-screen">
      <div className="flex flex-col gap-2 relative px-4 py-8 md:px-8 md:py-10 rounded-2xl mb-4 overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          Career Explorer
        </h1>
        <p className="text-muted-foreground max-w-3xl relative z-10">
          Discover career paths in STEM fields, explore job roles, and get
          personalized roadmaps to achieve your career goals.
        </p>

        <div className="relative z-10 mt-4 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search job roles or career paths..."
              className="pl-10 bg-background/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="jobRoles" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger
            value="jobRoles"
            onClick={() => (window.location.href = "/career/job")}
          >
            Job Roles
          </TabsTrigger>
          <TabsTrigger value="roadmaps">Career Roadmaps</TabsTrigger>
          <TabsTrigger
            value="applications"
            onClick={() => (window.location.href = "/career/applications")}
          >
            My Applications
          </TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="jobRoles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Software Development Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Software Development</CardTitle>
                <CardDescription>
                  Coding, design, and development roles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Frontend Developer</Badge>
                  <Badge variant="outline">Backend Developer</Badge>
                  <Badge variant="outline">Full Stack Developer</Badge>
                  <Badge variant="outline">Mobile Developer</Badge>
                  <Badge variant="outline">Game Developer</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => (window.location.href = "/career/job")}
                >
                  Explore Roles
                </Button>
              </CardFooter>
            </Card>

            {/* Data Science Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Data Science</CardTitle>
                <CardDescription>
                  Analyze and interpret complex data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Data Scientist</Badge>
                  <Badge variant="outline">Data Analyst</Badge>
                  <Badge variant="outline">Machine Learning Engineer</Badge>
                  <Badge variant="outline">Research Scientist</Badge>
                  <Badge variant="outline">Business Intelligence</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => (window.location.href = "/career/job")}
                >
                  Explore Roles
                </Button>
              </CardFooter>
            </Card>

            {/* Engineering Roles */}
            <Card>
              <CardHeader>
                <CardTitle>Engineering</CardTitle>
                <CardDescription>
                  Design and build hardware and systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Electrical Engineer</Badge>
                  <Badge variant="outline">Mechanical Engineer</Badge>
                  <Badge variant="outline">Civil Engineer</Badge>
                  <Badge variant="outline">Robotics Engineer</Badge>
                  <Badge variant="outline">Aerospace Engineer</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => (window.location.href = "/career/job")}
                >
                  Explore Roles
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Featured Jobs Banner */}
          <Card className="mt-6 border-2 border-primary/20">
            <CardHeader className="bg-primary/5">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Popular Job Roles</CardTitle>
                  <CardDescription>
                    Explore in-demand career paths
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-medium text-base">
                    Full Stack Developer
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Develops both client and server software, working with
                    databases, APIs, and user interfaces.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-auto"
                    onClick={() =>
                      (window.location.href = "/career/job/fullstack-developer")
                    }
                  >
                    View Role
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-medium text-base">Data Scientist</h3>
                  <p className="text-sm text-muted-foreground">
                    Analyzes complex data to extract insights and solve business
                    problems using statistical methods and ML.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-auto"
                    onClick={() =>
                      (window.location.href = "/career/job/data-scientist")
                    }
                  >
                    View Role
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col items-start gap-2">
                  <h3 className="font-medium text-base">UX Designer</h3>
                  <p className="text-sm text-muted-foreground">
                    Creates intuitive, user-centered digital experiences through
                    research and design.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-auto"
                    onClick={() =>
                      (window.location.href = "/career/job/ux-designer")
                    }
                  >
                    View Role
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button onClick={() => (window.location.href = "/career/job")}>
                  View All Job Roles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Categories */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-8 flex flex-col gap-2"
            >
              <Briefcase className="h-8 w-8 mb-2 text-primary" />
              <span>Technology</span>
              <span className="text-xs text-muted-foreground">5,324 jobs</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-8 flex flex-col gap-2"
            >
              <Briefcase className="h-8 w-8 mb-2 text-primary" />
              <span>Healthcare</span>
              <span className="text-xs text-muted-foreground">3,142 jobs</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-8 flex flex-col gap-2"
            >
              <Briefcase className="h-8 w-8 mb-2 text-primary" />
              <span>Engineering</span>
              <span className="text-xs text-muted-foreground">2,845 jobs</span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-8 flex flex-col gap-2"
            >
              <Briefcase className="h-8 w-8 mb-2 text-primary" />
              <span>Education</span>
              <span className="text-xs text-muted-foreground">1,932 jobs</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="roadmaps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Career Roadmap</CardTitle>
              <CardDescription>
                Personalized path based on your skills and interests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Complete your skill assessment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Take a diagnostic test to identify your strengths
                    </p>
                  </div>
                  <Button size="sm" className="ml-auto">
                    Start
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">
                      Explore recommended career paths
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Based on your skills and interests
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    View
                  </Button>
                </div>

                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Build your learning plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Custom curriculum to reach your career goals
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto">
                    Create
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Career Path */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>
                Interactive Career Path: Software Development
              </CardTitle>
              <CardDescription>
                Track your progress on the software development career path
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Junior Developer</h3>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Completed
                    </Badge>
                  </div>
                  <Progress value={100} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Core Skills
                      </p>
                      <p className="text-sm font-medium">HTML/CSS/JS</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="text-sm font-medium">Personal Site</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Version Control
                      </p>
                      <p className="text-sm font-medium">Git Basics</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Theory</p>
                      <p className="text-sm font-medium">Programming Logic</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Mid-level Developer</h3>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      In Progress
                    </Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Frameworks
                      </p>
                      <p className="text-sm font-medium">React/Angular</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Backend</p>
                      <p className="text-sm font-medium">Node.js/Express</p>
                      <CheckCircle2 className="h-4 w-4 mx-auto mt-1 text-green-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Databases</p>
                      <p className="text-sm font-medium">SQL/NoSQL</p>
                      <Clock className="h-4 w-4 mx-auto mt-1 text-orange-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Testing</p>
                      <p className="text-sm font-medium">Unit/Integration</p>
                      <AlertCircle className="h-4 w-4 mx-auto mt-1 text-red-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Senior Developer</h3>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Architecture
                      </p>
                      <p className="text-sm font-medium">System Design</p>
                      <AlertCircle className="h-4 w-4 mx-auto mt-1 text-red-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">
                        Leadership
                      </p>
                      <p className="text-sm font-medium">Team Management</p>
                      <AlertCircle className="h-4 w-4 mx-auto mt-1 text-red-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">Scaling</p>
                      <p className="text-sm font-medium">Performance</p>
                      <AlertCircle className="h-4 w-4 mx-auto mt-1 text-red-500" />
                    </div>
                    <div className="border rounded p-2 text-center">
                      <p className="text-xs text-muted-foreground">DevOps</p>
                      <p className="text-sm font-medium">CI/CD Pipelines</p>
                      <AlertCircle className="h-4 w-4 mx-auto mt-1 text-red-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Export Path</Button>
              <Button>Update Skills</Button>
            </CardFooter>
          </Card>

          {/* Career Path Comparison */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Career Path Comparison</CardTitle>
              <CardDescription>
                Compare different career trajectories in tech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-2 text-left font-medium">
                        Career Path
                      </th>
                      <th className="py-3 px-2 text-left font-medium">
                        Entry Level
                      </th>
                      <th className="py-3 px-2 text-left font-medium">
                        Mid Level (3-5y)
                      </th>
                      <th className="py-3 px-2 text-left font-medium">
                        Senior (5-10y)
                      </th>
                      <th className="py-3 px-2 text-left font-medium">
                        Lead (10y+)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">Web Development</td>
                      <td className="py-3 px-2 text-sm">$65-80K</td>
                      <td className="py-3 px-2 text-sm">$90-120K</td>
                      <td className="py-3 px-2 text-sm">$120-160K</td>
                      <td className="py-3 px-2 text-sm">$150-200K+</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">Data Science</td>
                      <td className="py-3 px-2 text-sm">$70-90K</td>
                      <td className="py-3 px-2 text-sm">$100-130K</td>
                      <td className="py-3 px-2 text-sm">$130-170K</td>
                      <td className="py-3 px-2 text-sm">$170-220K+</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">DevOps/Cloud</td>
                      <td className="py-3 px-2 text-sm">$75-95K</td>
                      <td className="py-3 px-2 text-sm">$100-140K</td>
                      <td className="py-3 px-2 text-sm">$140-180K</td>
                      <td className="py-3 px-2 text-sm">$180-230K+</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-3 px-2 font-medium">AI/ML</td>
                      <td className="py-3 px-2 text-sm">$80-100K</td>
                      <td className="py-3 px-2 text-sm">$110-150K</td>
                      <td className="py-3 px-2 text-sm">$150-200K</td>
                      <td className="py-3 px-2 text-sm">$200-250K+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Applications</CardTitle>
              <CardDescription>
                Track your job applications and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1 mb-3 md:mb-0">
                    <h3 className="font-medium">Frontend Developer</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        TechSolutions Inc.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Applied on July 1, 2025
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 md:self-end">
                      Interview Scheduled
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>Message</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1 mb-3 md:mb-0">
                    <h3 className="font-medium">Data Engineer</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        DataCorp Analytics
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Applied on June 25, 2025
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 md:self-end">
                      Application Received
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>View Resume</span>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1 mb-3 md:mb-0">
                    <h3 className="font-medium">UX Designer</h3>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        DesignWorks Studio
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Applied on June 18, 2025
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge variant="destructive" className="md:self-end">
                      Not Selected
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Feedback
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>View Resume</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Export to PDF
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Resume
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Resume</DialogTitle>
                    <DialogDescription>
                      Update your resume to use for future applications
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="resume-name">Resume Name</Label>
                      <Input
                        id="resume-name"
                        placeholder="e.g. Software Developer Resume July 2025"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Resume File</Label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOCX or TXT (MAX. 5MB)
                            </p>
                          </div>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button>Upload Resume</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>

          {/* Resume Manager */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resume Manager</CardTitle>
              <CardDescription>
                Manage your resume versions for different job types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium">
                        Software_Developer_Resume.pdf
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Added July 5, 2025</span>
                        <span>1.2 MB</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium">Data_Science_Resume.pdf</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Added June 12, 2025</span>
                        <span>980 KB</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <h3 className="font-medium">UI_UX_Designer_Resume.pdf</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Added May 28, 2025</span>
                        <span>1.5 MB</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => (window.location.href = "/career/resumes")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload New Resume Version
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Career Resources</CardTitle>
              <CardDescription>
                Tools and guides to help you succeed in your career journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resume Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Create professional resumes tailored to specific job roles
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Start Building</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Interview Prep</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Practice common interview questions and scenarios
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Practice Now</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Salary Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Research competitive compensation for different roles
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Data</Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Learning Resources</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">
                        Technical Interview Handbook
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Comprehensive guide to acing technical interviews with
                      practice problems and solutions.
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Updated Monthly</Badge>
                      <Button variant="outline" size="sm">
                        Access Guide
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Career Transition Guide</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Step-by-step guidance for professionals looking to switch
                      careers into tech fields.
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">PDF + Videos</Badge>
                      <Button variant="outline" size="sm">
                        Download Guide
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h4 className="font-medium">Networking for Introverts</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Strategies and templates for building professional
                      connections, especially for those who find networking
                      challenging.
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Interactive</Badge>
                      <Button variant="outline" size="sm">
                        Start Learning
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Career Events</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Virtual Tech Career Fair</h4>
                      <Badge>Upcoming</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Connect with top tech companies looking to hire for
                      various roles.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>July 15, 2025 • 10:00 AM - 4:00 PM EST</span>
                    </div>
                    <Button size="sm" className="mt-3">
                      Register Now
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">Resume Review Workshop</h4>
                      <Badge>Upcoming</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get feedback on your resume from industry professionals.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>July 22, 2025 • 1:00 PM - 3:00 PM EST</span>
                    </div>
                    <Button size="sm" className="mt-3">
                      Register Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareerComponent;
