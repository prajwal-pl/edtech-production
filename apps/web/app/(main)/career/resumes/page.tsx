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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Upload,
  Download,
  Trash2,
  PenLine,
  Eye,
  Star,
  StarOff,
  Search,
  Plus,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

const ResumesPage = () => {
  return (
    <Container>
      <div className="py-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Resume Manager
            </h1>
            <p className="text-muted-foreground max-w-3xl">
              Store, organize, and manage different versions of your resume for
              various job applications.
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Upload New Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Resume</DialogTitle>
                <DialogDescription>
                  Add a new resume to your collection
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
                  <Label htmlFor="resume-category">Category</Label>
                  <Input
                    id="resume-category"
                    placeholder="e.g. Software Development, Data Science"
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
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resumes..." className="pl-10" />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Resumes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recently-used">Recently Used</TabsTrigger>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      Software_Developer_Resume.pdf
                    </h3>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Latest
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Added July 5, 2025</span>
                    <span>1.2 MB</span>
                    <span>Software Development</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Star className="h-4 w-4 text-yellow-500" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
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
                    <span>Data Science</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <StarOff className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
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
                    <span>Design</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <StarOff className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="font-medium">
                    Software_Engineer_Resume_2024.pdf
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Added April 15, 2025</span>
                    <span>1.1 MB</span>
                    <span>Software Development</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <StarOff className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="h-10 w-10 text-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">
                      Software_Developer_Resume.pdf
                    </h3>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Latest
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Added July 5, 2025</span>
                    <span>1.2 MB</span>
                    <span>Software Development</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Star className="h-4 w-4 text-yellow-500" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-center items-center p-12 text-center text-muted-foreground">
              <div>
                <Star className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>You only have one favorite resume.</p>
                <p className="text-sm">
                  Mark more resumes as favorites by clicking the star icon.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recently-used" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Resume Usage History</CardTitle>
                <CardDescription>
                  Track when and where you've used each resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">
                      Software_Developer_Resume.pdf
                    </h3>
                  </div>
                  <div className="space-y-2 text-sm pl-8">
                    <div className="flex justify-between border-b pb-2">
                      <span>TechCorp Inc. - Senior Full Stack Developer</span>
                      <span className="text-muted-foreground">
                        July 1, 2025
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>InnovateTech - Full Stack Engineer</span>
                      <span className="text-muted-foreground">
                        June 28, 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Data_Science_Resume.pdf</h3>
                  </div>
                  <div className="space-y-2 text-sm pl-8">
                    <div className="flex justify-between border-b pb-2">
                      <span>DataTech Solutions - Senior Data Scientist</span>
                      <span className="text-muted-foreground">
                        June 20, 2025
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="by-category" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Software Development</CardTitle>
                  <CardDescription>2 resumes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Software_Developer_Resume.pdf</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Latest
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Software_Engineer_Resume_2024.pdf</span>
                    </div>
                    <Badge variant="outline">Older</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Science</CardTitle>
                  <CardDescription>1 resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>Data_Science_Resume.pdf</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Latest
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Design</CardTitle>
                  <CardDescription>1 resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span>UI_UX_Designer_Resume.pdf</span>
                    </div>
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                      Latest
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Resume Builder & Optimization</CardTitle>
            <CardDescription>
              Tools to help you create and improve your resumes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resume Builder</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Create professional resumes with our guided builder tool
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Start Building</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">AI Resume Feedback</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Get instant analysis and improvement suggestions
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Analyze Resume</Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">ATS Optimization</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-muted-foreground">
                    Ensure your resume passes Applicant Tracking Systems
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Optimize Now</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="p-4 border rounded-lg flex gap-4 items-center bg-muted/20">
              <AlertCircle className="h-8 w-8 text-amber-500 flex-shrink-0" />
              <div>
                <h3 className="font-medium mb-1">Resume Optimization Tips</h3>
                <p className="text-sm text-muted-foreground">
                  Tailoring your resume for each application increases your
                  chances of getting an interview by up to 60%. Consider
                  creating different versions that highlight specific skills
                  relevant to each job.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Check Resume Health
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};

export default ResumesPage;
