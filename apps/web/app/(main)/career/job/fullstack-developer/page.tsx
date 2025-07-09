"use client";

import React from "react";
import Container from "@/components/global/Container";
import JobHeader from "@/components/global/JobHeader";
import RoleOverview from "@/components/global/RoleOverview";
import SkillRequirements from "@/components/global/SkillRequirements";
import CareerProgression from "@/components/global/CareerProgression";
import JobOpenings from "@/components/global/JobOpenings";
import RecommendedLearning from "@/components/global/RecommendedLearning";
import Certifications from "@/components/global/Certifications";

const FullStackDevPage = () => {
  // Role Overview data
  const roleOverviewData = {
    title: "What does a Full Stack Developer do?",
    description:
      "Full Stack Developers are versatile software engineers proficient in both frontend and backend development. They build complete web applications, from user interfaces to server infrastructure and databases.",
    medianSalary: "$112,000",
    jobGrowth: "27% Growth",
    education: "Bachelor's",
    responsibilities: [
      "Developing and maintaining both frontend and backend components of web applications",
      "Designing and implementing databases and ensuring optimal performance",
      "Building RESTful APIs and microservices for application functionality",
      "Implementing authentication, security features, and best practices",
      "Collaborating with UX/UI designers to implement responsive designs",
    ],
  };

  // Skill Requirements data
  const skillsData = {
    categories: [
      {
        name: "Frontend Technologies",
        skills: [
          { name: "HTML/CSS", level: "Advanced", proficiency: 90 },
          { name: "JavaScript", level: "Advanced", proficiency: 90 },
          { name: "React/Angular/Vue", level: "Advanced", proficiency: 85 },
          {
            name: "Responsive Design",
            level: "Intermediate-Advanced",
            proficiency: 80,
          },
        ],
      },
      {
        name: "Backend Technologies",
        skills: [
          { name: "Node.js/Python/Ruby", level: "Advanced", proficiency: 85 },
          {
            name: "Express/Django/Rails",
            level: "Intermediate-Advanced",
            proficiency: 80,
          },
          { name: "RESTful APIs", level: "Advanced", proficiency: 85 },
        ],
      },
      {
        name: "Database Knowledge",
        skills: [
          {
            name: "SQL (MySQL, PostgreSQL)",
            level: "Intermediate-Advanced",
            proficiency: 80,
          },
          {
            name: "NoSQL (MongoDB, Firebase)",
            level: "Intermediate",
            proficiency: 70,
          },
        ],
      },
      {
        name: "Other Essential Skills",
        skills: [
          { name: "Version Control (Git)", level: "Advanced", proficiency: 85 },
          { name: "CI/CD Pipelines", level: "Intermediate", proficiency: 65 },
          {
            name: "Testing (Unit, Integration)",
            level: "Intermediate",
            proficiency: 70,
          },
          {
            name: "Security Best Practices",
            level: "Intermediate",
            proficiency: 75,
          },
        ],
      },
    ],
  };

  // Career Progression data
  const careerProgressionData = {
    steps: [
      {
        level: 1,
        title: "Junior Full Stack Developer",
        description:
          "Entry-level position focused on implementing features under guidance. Typically requires basic knowledge of frontend and backend technologies.",
        salaryRange: "$70,000 - $90,000",
      },
      {
        level: 2,
        title: "Mid-level Full Stack Developer",
        description:
          "Takes ownership of features and components. Works independently and may mentor junior developers. Typically requires 2-4 years of experience.",
        salaryRange: "$90,000 - $120,000",
      },
      {
        level: 3,
        title: "Senior Full Stack Developer",
        description:
          "Designs system architecture, makes technical decisions, and leads development efforts. Typically requires 5+ years of experience.",
        salaryRange: "$120,000 - $160,000",
      },
      {
        level: 4,
        title: "Lead Developer / Architect",
        description:
          "Oversees multiple projects, defines technical direction, and manages teams. May transition to management or specialized architect roles.",
        salaryRange: "$150,000 - $200,000+",
      },
    ],
  };

  // Job Openings data
  const jobOpeningsData = {
    openings: [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        location: "Remote (US)",
        salary: "$120K - $150K",
      },
      {
        title: "Full Stack Engineer",
        company: "InnovateTech",
        location: "San Francisco, CA (Hybrid)",
        salary: "$90K - $120K",
      },
      {
        title: "Junior Full Stack Developer",
        company: "WebSolutions LLC",
        location: "Chicago, IL (On-site)",
        salary: "$70K - $85K",
      },
    ],
  };

  // Recommended Learning data
  const learningData = {
    courses: [
      {
        title: "Modern Web Development",
        description:
          "Comprehensive course covering React, Node.js, and modern web architecture.",
        duration: "12 weeks",
      },
      {
        title: "Database Design & SQL",
        description:
          "In-depth course on relational database design, SQL, and optimization.",
        duration: "8 weeks",
      },
      {
        title: "API Development",
        description: "Build robust and scalable APIs using REST and GraphQL.",
        duration: "6 weeks",
      },
    ],
  };

  // Certifications data
  const certificationsData = {
    certifications: [
      {
        name: "AWS Certified Developer",
        provider: "Amazon Web Services",
      },
      {
        name: "MongoDB Certified Developer",
        provider: "MongoDB, Inc.",
      },
      {
        name: "Professional Scrum Developer",
        provider: "Scrum.org",
      },
    ],
  };

  const handleApplyForJob = (job: any) => {
    console.log("Applying for job:", job);
    // Implementation for job application
  };

  const handleStartLearning = (course: any) => {
    console.log("Starting course:", course);
    // Implementation for starting a course
  };

  return (
    <Container>
      <div className="py-4">
        <JobHeader
          title="Full Stack Developer"
          description="Design and build both client and server software"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <RoleOverview {...roleOverviewData} />
            <SkillRequirements categories={skillsData.categories} />
            <CareerProgression steps={careerProgressionData.steps} />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <JobOpenings
              openings={jobOpeningsData.openings}
              onApply={handleApplyForJob}
            />
            <RecommendedLearning
              courses={learningData.courses}
              onStartLearning={handleStartLearning}
            />
            <Certifications
              certifications={certificationsData.certifications}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FullStackDevPage;
