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

const UXDesignerPage = () => {
  // Role Overview data
  const roleOverviewData = {
    title: "What does a UX Designer do?",
    description:
      "UX (User Experience) Designers focus on creating intuitive, accessible, and enjoyable digital experiences. They research user needs, create wireframes and prototypes, conduct user testing, and collaborate with development teams to implement human-centered designs.",
    medianSalary: "$102,000",
    jobGrowth: "24% Growth",
    education: "Bachelor's",
    responsibilities: [
      "Conducting user research and usability testing to understand user behaviors and needs",
      "Creating user personas, user flows, wireframes, and interactive prototypes",
      "Collaborating with UI designers, developers, and product managers",
      "Designing information architecture and navigation systems",
      "Advocating for the user's perspective throughout the product development process",
    ],
  };

  // Skill Requirements data
  const skillsData = {
    categories: [
      {
        name: "Design Tools",
        skills: [
          { name: "Figma", level: "Advanced", proficiency: 90 },
          { name: "Sketch", level: "Intermediate-Advanced", proficiency: 80 },
          { name: "Adobe XD", level: "Intermediate-Advanced", proficiency: 75 },
          { name: "Prototyping Tools", level: "Advanced", proficiency: 85 },
        ],
      },
      {
        name: "Research & Testing",
        skills: [
          { name: "User Research Methods", level: "Advanced", proficiency: 85 },
          { name: "Usability Testing", level: "Advanced", proficiency: 90 },
          {
            name: "Analytics Interpretation",
            level: "Intermediate",
            proficiency: 70,
          },
        ],
      },
      {
        name: "Design Principles",
        skills: [
          {
            name: "Information Architecture",
            level: "Advanced",
            proficiency: 85,
          },
          { name: "Interaction Design", level: "Advanced", proficiency: 90 },
          {
            name: "Accessibility Standards",
            level: "Intermediate-Advanced",
            proficiency: 80,
          },
        ],
      },
      {
        name: "Other Essential Skills",
        skills: [
          { name: "Communication", level: "Advanced", proficiency: 90 },
          { name: "Basic HTML/CSS", level: "Intermediate", proficiency: 65 },
          { name: "Collaboration", level: "Advanced", proficiency: 85 },
        ],
      },
    ],
  };

  // Career Progression data
  const careerProgressionData = {
    steps: [
      {
        level: 1,
        title: "Junior UX Designer",
        description:
          "Entry-level position working on specific components or features under guidance, learning design systems and research methodologies.",
        salaryRange: "$70,000 - $90,000",
      },
      {
        level: 2,
        title: "UX Designer",
        description:
          "Mid-level role independently designing features, conducting research, and collaborating across teams to implement solutions.",
        salaryRange: "$90,000 - $120,000",
      },
      {
        level: 3,
        title: "Senior UX Designer",
        description:
          "Experienced professional designing complex systems, mentoring junior designers, and influencing product strategy.",
        salaryRange: "$110,000 - $150,000",
      },
      {
        level: 4,
        title: "UX Lead / Director of User Experience",
        description:
          "Leadership role setting UX strategy, managing design teams, and aligning user experience with business objectives.",
        salaryRange: "$140,000 - $180,000+",
      },
    ],
  };

  // Job Openings data
  const jobOpeningsData = {
    openings: [
      {
        title: "Senior UX Designer",
        company: "CreativeDesign Co.",
        location: "Remote (US)",
        salary: "$120,000 - $140,000",
      },
      {
        title: "UX Designer, Fintech",
        company: "FinanceApp Global",
        location: "New York, NY (Hybrid)",
        salary: "$110,000 - $135,000",
      },
      {
        title: "Junior UX Designer",
        company: "StartupUX",
        location: "Austin, TX (On-site)",
        salary: "$75,000 - $90,000",
      },
    ],
  };

  // Recommended Learning data
  const learningData = {
    courses: [
      {
        title: "UX Research Methods",
        description:
          "Learn effective techniques for understanding user needs and behaviors.",
        duration: "6 weeks",
      },
      {
        title: "Interaction Design Fundamentals",
        description:
          "Master the principles of creating intuitive user interactions.",
        duration: "8 weeks",
      },
      {
        title: "Prototyping for UX Designers",
        description:
          "Create high-fidelity interactive prototypes that communicate your design intent.",
        duration: "5 weeks",
      },
    ],
  };

  // Certifications data
  const certificationsData = {
    certifications: [
      {
        name: "Certified Professional in User Experience (CPUX)",
        provider: "UXPA",
      },
      {
        name: "Google UX Design Professional Certificate",
        provider: "Google",
      },
      {
        name: "Nielsen Norman Group UX Certification",
        provider: "NN/g",
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
          title="UX Designer"
          description="Create intuitive and user-centered digital experiences"
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

export default UXDesignerPage;
