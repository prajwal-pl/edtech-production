"use client";
import React from "react";
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
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Download, Upload, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProjectsComponentProps {
  username?: string;
}

const ProjectsComponent: React.FC<ProjectsComponentProps> = ({ username }) => {
  return (
    <div className="flex flex-col gap-6 py-6 min-h-screen">
      <div className="flex flex-col gap-2 relative px-4 py-8 md:px-8 md:py-10 rounded-2xl mb-4 overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          STEM Projects
        </h1>
        <p className="text-muted-foreground max-w-3xl relative z-10">
          View, work on, and submit hands-on projects that reinforce your
          learning and build your portfolio.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4 relative z-10">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10 bg-background/80 backdrop-blur-sm"
            />
          </div>

          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-background/80 backdrop-blur-sm flex gap-2"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Projects</DialogTitle>
                  <DialogDescription>
                    Select filters to narrow your project search
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Difficulty Level</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                        (level) => (
                          <div
                            key={level}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox id={`difficulty-${level}`} />
                            <label
                              htmlFor={`difficulty-${level}`}
                              className="text-sm"
                            >
                              {level}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Project Type</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Software",
                        "Hardware",
                        "Research",
                        "Design",
                        "Data Analysis",
                      ].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type}`} />
                          <label htmlFor={`type-${type}`} className="text-sm">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline">Reset</Button>
                  <Button>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex gap-2">
                  <Plus className="h-4 w-4" />
                  <span>New Project</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start a new project or upload an existing one
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Plus className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Start from Scratch</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      Create a new project with our templates
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="h-8 w-8 mb-2 text-primary" />
                    <h3 className="font-medium">Upload Existing</h3>
                    <p className="text-sm text-muted-foreground text-center mt-1">
                      Import a project you've already started
                    </p>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <Tabs defaultValue="myProjects" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="myProjects">My Projects</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="myProjects" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* In Progress Project */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Machine Learning Image Classifier</CardTitle>
                    <CardDescription>
                      Build an ML model to classify images
                    </CardDescription>
                  </div>
                  <Badge>In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <p className="text-sm text-muted-foreground">
                  You're working on building the model training pipeline. Next
                  steps: evaluate model performance.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button>Continue Project</Button>
              </CardFooter>
            </Card>

            {/* Not Started Project */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Web Development Portfolio</CardTitle>
                    <CardDescription>
                      Create a personal portfolio website
                    </CardDescription>
                  </div>
                  <Badge variant="outline">Not Started</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Build a responsive portfolio website showcasing your skills
                  and projects using HTML, CSS, and JavaScript.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View Details</Button>
                <Button>Start Project</Button>
              </CardFooter>
            </Card>

            {/* Export Projects Button */}
            <div className="mt-6 flex justify-end">
              <Button variant="outline" className="flex gap-2">
                <Download className="h-4 w-4" />
                <span>Export Projects Report</span>
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discover" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Project 1 */}
            <Card>
              <CardHeader>
                <CardTitle>IoT Weather Station</CardTitle>
                <CardDescription>Hardware + Software</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Build a connected weather station using Arduino and sensors to
                  collect and visualize environmental data.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Arduino</Badge>
                  <Badge variant="secondary">IoT</Badge>
                  <Badge variant="secondary">Data Viz</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to My Projects</Button>
              </CardFooter>
            </Card>

            {/* Project 2 */}
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Development</CardTitle>
                <CardDescription>Software Development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a cross-platform mobile app that solves a real-world
                  problem using React Native.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React Native</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">UI/UX</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to My Projects</Button>
              </CardFooter>
            </Card>

            {/* Project 3 */}
            <Card>
              <CardHeader>
                <CardTitle>Genetic Algorithm Simulation</CardTitle>
                <CardDescription>Computer Science</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Implement a genetic algorithm to solve optimization problems
                  and visualize the evolution process.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Algorithms</Badge>
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">AI</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Add to My Projects</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submitted Projects</CardTitle>
              <CardDescription>
                Track your project submissions and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Python Data Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted on June 15, 2025
                    </p>
                  </div>
                  <Badge className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Approved
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Robotics Simulation</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted on May 28, 2025
                    </p>
                  </div>
                  <Badge className="ml-auto" variant="outline">
                    Under Review
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Submissions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectsComponent;
