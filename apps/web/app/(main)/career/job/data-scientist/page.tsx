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

const DataScientistPage = () => {
  // Role Overview data
  const roleOverviewData = {
    title: "What does a Data Scientist do?",
    description:
      "Data Scientists analyze complex datasets to uncover patterns, extract insights, and solve business problems. They combine statistical analysis, machine learning, and domain knowledge to help organizations make data-driven decisions.",
    medianSalary: "$125,000",
    jobGrowth: "31% Growth",
    education: "Master's",
    responsibilities: [
      "Gathering, cleaning, and preprocessing large datasets from various sources",
      "Developing and implementing machine learning models and algorithms",
      "Creating data visualizations and dashboards to communicate insights",
      "Collaborating with stakeholders to understand business needs and requirements",
      "Deploying models to production and monitoring their performance",
    ],
  };

  // Skill Requirements data
  const skillsData = {
    categories: [
      {
        name: "Programming Languages",
        skills: [
          { name: "Python", level: "Advanced", proficiency: 90 },
          { name: "R", level: "Intermediate-Advanced", proficiency: 80 },
          { name: "SQL", level: "Advanced", proficiency: 85 },
        ],
      },
      {
        name: "Machine Learning & Statistical Analysis",
        skills: [
          {
            name: "Scikit-learn, TensorFlow, PyTorch",
            level: "Advanced",
            proficiency: 85,
          },
          { name: "Statistical Methods", level: "Advanced", proficiency: 90 },
          {
            name: "Deep Learning",
            level: "Intermediate-Advanced",
            proficiency: 75,
          },
        ],
      },
      {
        name: "Data Manipulation & Visualization",
        skills: [
          { name: "Pandas, NumPy", level: "Advanced", proficiency: 90 },
          {
            name: "Matplotlib, Seaborn, Tableau",
            level: "Advanced",
            proficiency: 85,
          },
        ],
      },
      {
        name: "Other Essential Skills",
        skills: [
          {
            name: "Big Data Technologies",
            level: "Intermediate",
            proficiency: 70,
          },
          {
            name: "Cloud Platforms (AWS, GCP, Azure)",
            level: "Intermediate",
            proficiency: 65,
          },
          {
            name: "Domain Knowledge",
            level: "Varies by industry",
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
        title: "Junior Data Scientist",
        description:
          "Entry-level position focusing on data cleaning, basic analysis, and working with established models under supervision.",
        salaryRange: "$85,000 - $105,000",
      },
      {
        level: 2,
        title: "Data Scientist",
        description:
          "Mid-level role developing models independently, leading projects, and providing actionable insights to stakeholders.",
        salaryRange: "$110,000 - $140,000",
      },
      {
        level: 3,
        title: "Senior Data Scientist",
        description:
          "Experienced professional implementing advanced algorithms, mentoring junior staff, and driving strategic data initiatives.",
        salaryRange: "$135,000 - $180,000",
      },
      {
        level: 4,
        title: "Lead Data Scientist / Director of Data Science",
        description:
          "Leadership role developing data strategy, managing teams, and aligning data initiatives with business objectives.",
        salaryRange: "$160,000 - $220,000+",
      },
    ],
  };

  // Job Openings data
  const jobOpeningsData = {
    openings: [
      {
        title: "Senior Data Scientist",
        company: "DataTech Solutions",
        location: "Remote (US)",
        salary: "$140,000 - $160,000",
      },
      {
        title: "Data Scientist, Healthcare",
        company: "MedAnalytics Inc.",
        location: "Boston, MA (Hybrid)",
        salary: "$120,000 - $145,000",
      },
      {
        title: "Junior Data Scientist",
        company: "TechStart AI",
        location: "San Francisco, CA (On-site)",
        salary: "$90,000 - $110,000",
      },
    ],
  };

  // Recommended Learning data
  const learningData = {
    courses: [
      {
        title: "Machine Learning Fundamentals",
        description:
          "Master the core concepts of machine learning algorithms and implementations.",
        duration: "8 weeks",
      },
      {
        title: "Advanced Data Visualization",
        description:
          "Create compelling visual narratives with your data using modern tools.",
        duration: "6 weeks",
      },
      {
        title: "Deep Learning Specialization",
        description:
          "Implement neural networks and deep learning models for complex problems.",
        duration: "12 weeks",
      },
    ],
  };

  // Certifications data
  const certificationsData = {
    certifications: [
      {
        name: "Microsoft Certified: Azure Data Scientist Associate",
        provider: "Microsoft",
      },
      {
        name: "IBM Data Science Professional Certificate",
        provider: "IBM",
      },
      {
        name: "TensorFlow Developer Certificate",
        provider: "Google",
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
          title="Data Scientist"
          description="Analyze complex data and extract actionable insights"
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

export default DataScientistPage;
