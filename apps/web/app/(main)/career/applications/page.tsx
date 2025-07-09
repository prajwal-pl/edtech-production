import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  Calendar,
  FileText,
  MessageSquare,
  Search,
  Filter,
  Plus,
  ArrowUp,
  ArrowDown,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

const ApplicationsPage = () => {
  return (
    <Container>
      <div className="py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Application Tracker
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Track and manage your job applications, interviews, and offers in
              one place.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Application
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-10" />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-[180px]">
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="recent">
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">
                  <div className="flex items-center">
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Most Recent
                  </div>
                </SelectItem>
                <SelectItem value="oldest">
                  <div className="flex items-center">
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Oldest First
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active (5)</TabsTrigger>
            <TabsTrigger value="archived">Archived (3)</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Senior Full Stack Developer</h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Offer Received
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">TechCorp Inc.</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: July 1, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Offer: July 28, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Accept Offer</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Frontend Developer</h3>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    Interview Scheduled
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    TechSolutions Inc.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: July 10, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Interview: August 5, 2025 • 2:00 PM</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  <span>Message</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Data Engineer</h3>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    Application Received
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    DataCorp Analytics
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: July 18, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>View Resume</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">UX Designer</h3>
                  <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    Assessment
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    DesignWorks Studio
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: July 14, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Due: July 30, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  <span>Submit Task</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">DevOps Engineer</h3>
                  <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    Application Received
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    CloudTech Solutions
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: July 25, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>View Resume</span>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg opacity-75">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Product Manager</h3>
                  <Badge variant="destructive">Rejected</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    ProductLabs Inc.
                  </p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: June 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    <span>Rejected: July 2, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>View Feedback</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg opacity-75">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Junior Software Engineer</h3>
                  <Badge variant="destructive">Withdrawn</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">StartupX</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: June 5, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    <span>Withdrawn: June 20, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg opacity-75">
              <div className="space-y-1 mb-3 md:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">Data Analyst</h3>
                  <Badge variant="destructive">Position Filled</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Analytics Co.</p>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Applied: May 28, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <X className="h-4 w-4" />
                    <span>Closed: June 30, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">8</CardTitle>
                  <CardDescription>Total Applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    5 active, 3 archived
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">2</CardTitle>
                  <CardDescription>Interviews</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    1 upcoming, 1 completed
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl">25%</CardTitle>
                  <CardDescription>Response Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    2 of 8 applications received responses
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Application Status Breakdown</CardTitle>
                <CardDescription>
                  Overview of your application statuses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Application Received
                      </span>
                      <span className="text-sm">3 applications</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: "38%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Assessment/Task
                      </span>
                      <span className="text-sm">1 application</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Interview</span>
                      <span className="text-sm">1 application</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Offer</span>
                      <span className="text-sm">1 application</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">
                        Rejected/Closed
                      </span>
                      <span className="text-sm">2 applications</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: "25%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Analytics Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Application Tips</CardTitle>
            <CardDescription>
              Increase your chances of success with these insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Follow Up After Applications</h3>
              <p className="text-sm text-muted-foreground">
                Consider sending a follow-up email one week after applying to
                express continued interest and inquire about the status of your
                application.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Tailor Your Resume</h3>
              <p className="text-sm text-muted-foreground">
                Applications with customized resumes that highlight relevant
                skills for each role have a 40% higher response rate.
              </p>
            </div>

            <div className="p-3 border rounded-lg">
              <h3 className="font-medium mb-1">Prepare for Common Questions</h3>
              <p className="text-sm text-muted-foreground">
                Review our interview preparation resources to practice responses
                to frequently asked questions in your field.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Application Resources
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default ApplicationsPage;
