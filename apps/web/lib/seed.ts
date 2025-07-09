import db from "@/lib/prisma";
import {
  EducationLevel,
  EnrollmentStatus,
  MessageSender,
  NotificationType,
  ProgressStatus,
  ProjectStatus,
  ProjectStepStatus,
  TutorSessionStatus,
} from "@/prisma/generated/client";
// import { hash } from "bcrypt";

const SALT_ROUNDS = 10;

/**
 * Database seeding script
 * Use this function to populate your database with initial data
 */
export async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    // Create subjects
    const webDevSubject = await db.subject.create({
      data: {
        name: "Web Development",
        description: "Learn modern web development techniques and frameworks",
        icon: "globe",
        color: "#3498db",
      },
    });

    const dataScience = await db.subject.create({
      data: {
        name: "Data Science",
        description:
          "Master data analysis, machine learning, and AI techniques",
        icon: "bar-chart",
        color: "#9b59b6",
      },
    });

    const uxDesign = await db.subject.create({
      data: {
        name: "UX Design",
        description: "Learn user experience design principles and practices",
        icon: "layout",
        color: "#e74c3c",
      },
    });

    // Create modules
    const htmlCssModule = await db.module.create({
      data: {
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of the web",
        subjectId: webDevSubject.id,
        level: "beginner",
        order: 1,
      },
    });

    const jsModule = await db.module.create({
      data: {
        title: "JavaScript Essentials",
        description: "Master core JavaScript concepts",
        subjectId: webDevSubject.id,
        level: "beginner",
        order: 2,
      },
    });

    const reactModule = await db.module.create({
      data: {
        title: "React Fundamentals",
        description: "Build modern UIs with React",
        subjectId: webDevSubject.id,
        level: "intermediate",
        order: 3,
      },
    });

    const pythonModule = await db.module.create({
      data: {
        title: "Python for Data Science",
        description: "Learn Python fundamentals for data analysis",
        subjectId: dataScience.id,
        level: "beginner",
        order: 1,
      },
    });

    const dataAnalysisModule = await db.module.create({
      data: {
        title: "Data Analysis with Pandas",
        description: "Master data manipulation and analysis in Python",
        subjectId: dataScience.id,
        level: "intermediate",
        order: 2,
      },
    });

    const uxBasicsModule = await db.module.create({
      data: {
        title: "UX Design Basics",
        description: "Learn fundamental UX design principles",
        subjectId: uxDesign.id,
        level: "beginner",
        order: 1,
      },
    });

    // Create lessons for HTML & CSS module
    const htmlIntroLesson = await db.lesson.create({
      data: {
        title: "Introduction to HTML",
        description: "Learn the basics of HTML structure and elements",
        content: `# Introduction to HTML

HTML (Hypertext Markup Language) is the standard markup language for documents designed to be displayed in a web browser.

## Basic Structure

An HTML document has a required structure that includes the following declarations and elements:

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
</body>
</html>
\`\`\`

## Common Elements

- **Headings**: \`<h1>\` to \`<h6>\`
- **Paragraphs**: \`<p>\`
- **Links**: \`<a href="url">\`
- **Images**: \`<img src="image.jpg" alt="description">\`
- **Lists**: \`<ul>\`, \`<ol>\`, and \`<li>\`
- **Divisions**: \`<div>\`
- **Spans**: \`<span>\`

## Semantic HTML

HTML5 introduced several semantic elements that clearly describe their meaning to both the browser and the developer:

- \`<header>\`: Represents introductory content
- \`<nav>\`: Defines navigation links
- \`<section>\`: Defines a section in a document
- \`<article>\`: Defines independent, self-contained content
- \`<footer>\`: Defines a footer for a document or section

## Practice Exercise

Create a simple HTML document about your favorite hobby that includes:
1. A proper document structure
2. At least three different heading levels
3. Multiple paragraphs
4. A list (ordered or unordered)
5. At least one link and one image
6. Proper use of semantic elements
`,
        duration: 60,
        difficulty: "beginner",
        moduleId: htmlCssModule.id,
        order: 1,
      },
    });

    const cssBasicsLesson = await db.lesson.create({
      data: {
        title: "CSS Basics",
        description: "Learn how to style your HTML with CSS",
        content: `# CSS Basics

CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.

## CSS Syntax

CSS has a simple syntax:

\`\`\`css
selector {
  property: value;
  property: value;
}
\`\`\`

## Ways to Add CSS

There are three ways to insert CSS:

1. **External CSS** - with a separate .css file
\`\`\`html
<link rel="stylesheet" href="styles.css">
\`\`\`

2. **Internal CSS** - using a <style> element in the <head> section
\`\`\`html
<style>
  body {
    background-color: lightblue;
  }
</style>
\`\`\`

3. **Inline CSS** - using the style attribute on HTML elements
\`\`\`html
<p style="color: red;">This is a red paragraph.</p>
\`\`\`

## CSS Selectors

- **Element selector**: targets HTML elements by their tag name (e.g., \`p\`, \`h1\`)
- **Class selector**: targets elements with a specific class attribute (e.g., \`.intro\`)
- **ID selector**: targets an element with a specific id attribute (e.g., \`#header\`)
- **Universal selector**: targets all elements (e.g., \`*\`)
- **Attribute selector**: targets elements with a specific attribute (e.g., \`[type="text"]\`)

## Common CSS Properties

- \`color\`: Sets the color of text
- \`background-color\`: Sets the background color
- \`font-family\`: Specifies the font
- \`font-size\`: Sets the size of the font
- \`margin\`: Sets the margin around an element
- \`padding\`: Sets the padding inside an element
- \`border\`: Sets the border around an element
- \`width\` and \`height\`: Set the dimensions of an element
- \`display\`: Specifies how an element is displayed
- \`position\`: Specifies the positioning method

## The Box Model

All HTML elements can be considered as boxes. The CSS box model describes the rectangular boxes that are generated for elements and how they are laid out according to the visual formatting model.

The box model consists of:
- **Content**: The actual content of the element
- **Padding**: Area around the content
- **Border**: Edge around the padding
- **Margin**: Area outside the border

## Practice Exercise

Create a CSS file for the HTML document you created in the previous lesson. Include:
1. Different text colors for headings and paragraphs
2. Background colors
3. Font styles
4. Margins and padding
5. Borders for at least one element
`,
        duration: 60,
        difficulty: "beginner",
        moduleId: htmlCssModule.id,
        order: 2,
      },
    });

    const responsiveDesignLesson = await db.lesson.create({
      data: {
        title: "Responsive Design",
        description: "Make your websites look great on all devices",
        content: `# Responsive Web Design

Responsive web design makes your web page look good on all devices. It uses CSS and HTML to resize, hide, shrink, enlarge, or move content to make it look good on any screen.

## Viewport Meta Tag

The viewport meta tag gives the browser instructions on how to control the page's dimensions and scaling:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

## Media Queries

Media queries allow you to apply different styles for different devices/screen sizes:

\`\`\`css
/* For mobile phones */
@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}

/* For tablets */
@media only screen and (min-width: 600px) and (max-width: 992px) {
  body {
    background-color: lightgreen;
  }
}
\`\`\`

## Responsive Images

Images should be flexible and adjust to different screen sizes:

\`\`\`css
img {
  max-width: 100%;
  height: auto;
}
\`\`\`

## Responsive Text

You can use viewport units to make text responsive:

\`\`\`css
h1 {
  font-size: 5vw; /* 5% of viewport width */
}
\`\`\`

## Flexbox

Flexbox is a layout model that helps create responsive layouts:

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
}

.item {
  flex: 1 1 200px; /* grow, shrink, basis */
}
\`\`\`

## CSS Grid

CSS Grid is another powerful layout system:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
\`\`\`

## Responsive Frameworks

Bootstrap, Foundation, and Tailwind CSS are popular frameworks that provide pre-built responsive components and layouts.

## Practice Exercise

Make your previous HTML/CSS project responsive:
1. Add the viewport meta tag
2. Use media queries for at least two different screen sizes
3. Make your images responsive
4. Implement either Flexbox or CSS Grid for layout
5. Test your page by resizing the browser window
`,
        duration: 60,
        difficulty: "intermediate",
        moduleId: htmlCssModule.id,
        order: 3,
      },
    });

    // Set lesson prerequisites
    await db.lesson.update({
      where: { id: cssBasicsLesson.id },
      data: {
        prerequisites: {
          connect: [{ id: htmlIntroLesson.id }],
        },
      },
    });

    await db.lesson.update({
      where: { id: responsiveDesignLesson.id },
      data: {
        prerequisites: {
          connect: [{ id: cssBasicsLesson.id }],
        },
      },
    });

    // Create JavaScript lessons
    const jsIntroLesson = await db.lesson.create({
      data: {
        title: "Introduction to JavaScript",
        description: "Learn the basics of JavaScript programming",
        content: `# Introduction to JavaScript

JavaScript is a programming language that allows you to implement complex features on web pages.

## Adding JavaScript to a Page

\`\`\`html
<script>
  // JavaScript code here
  console.log("Hello, world!");
</script>
\`\`\`

Or from an external file:

\`\`\`html
<script src="script.js"></script>
\`\`\`

## Variables

JavaScript has three ways to declare variables:

\`\`\`javascript
var x = 5;       // old way, function-scoped
let y = 10;      // block-scoped variable
const z = 15;    // block-scoped constant
\`\`\`

## Data Types

JavaScript has several data types:

- **Number**: \`let age = 25;\`
- **String**: \`let name = "John";\`
- **Boolean**: \`let isActive = true;\`
- **Object**: \`let person = {name: "John", age: 25};\`
- **Array**: \`let colors = ["red", "green", "blue"];\`
- **Null**: \`let empty = null;\`
- **Undefined**: \`let notDefined;\`

## Operators

\`\`\`javascript
// Arithmetic operators
let sum = 5 + 10;
let difference = 10 - 5;
let product = 5 * 10;
let quotient = 10 / 5;

// Comparison operators
let isEqual = 5 === 5;
let isNotEqual = 5 !== 10;
let isGreater = 10 > 5;

// Logical operators
let andResult = true && false; // false
let orResult = true || false;  // true
let notResult = !true;         // false
\`\`\`

## Conditional Statements

\`\`\`javascript
if (condition) {
  // code to run if condition is true
} else if (anotherCondition) {
  // code to run if anotherCondition is true
} else {
  // code to run if no conditions are true
}
\`\`\`

## Loops

\`\`\`javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// While loop
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// For...of loop (arrays)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}

// For...in loop (objects)
const person = {name: "John", age: 30};
for (const key in person) {
  console.log(key + ": " + person[key]);
}
\`\`\`

## Functions

\`\`\`javascript
// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Function expression
const greet = function(name) {
  return "Hello, " + name + "!";
};

// Arrow function
const greet = (name) => {
  return "Hello, " + name + "!";
};
// Shorter arrow function
const greet = name => "Hello, " + name + "!";
\`\`\`

## Practice Exercise

Create a JavaScript program that:
1. Declares variables of different types
2. Uses arithmetic, comparison, and logical operators
3. Implements conditional statements
4. Uses at least two different types of loops
5. Creates and calls at least two functions
`,
        duration: 60,
        difficulty: "beginner",
        moduleId: jsModule.id,
        order: 1,
      },
    });

    // Create some diagnostic questions
    await db.diagnosticQuestion.createMany({
      data: [
        {
          subjectId: webDevSubject.id,
          text: "Which of the following is NOT a valid HTML tag?",
          options: ["<div>", "<span>", "<paragraph>", "<header>"],
          correctAnswer: 2,
          difficulty: "easy",
        },
        {
          subjectId: webDevSubject.id,
          text: "In CSS, what property is used to change the text color?",
          options: ["text-color", "font-color", "color", "text-style"],
          correctAnswer: 2,
          difficulty: "easy",
        },
        {
          subjectId: webDevSubject.id,
          text: "Which JavaScript function is used to select an HTML element by its id?",
          options: [
            "document.query()",
            "document.getElementById()",
            "document.getElement()",
            "document.selectElement()",
          ],
          correctAnswer: 1,
          difficulty: "medium",
        },
        {
          subjectId: dataScience.id,
          text: "Which Python library is commonly used for data manipulation and analysis?",
          options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
          correctAnswer: 1,
          difficulty: "medium",
        },
        {
          subjectId: dataScience.id,
          text: "What does the term 'overfitting' refer to in machine learning?",
          options: [
            "When a model performs well on training data but poorly on new data",
            "When a model is too simple to capture patterns in the data",
            "When a model has too few parameters",
            "When a model trains too quickly",
          ],
          correctAnswer: 0,
          difficulty: "hard",
        },
      ],
    });

    // Create career paths
    const webDevCareer = await db.career.create({
      data: {
        title: "Full Stack Web Developer",
        description:
          "A full stack web developer is a developer who can handle all aspects of web development, from frontend to backend.",
        requirements: JSON.stringify({
          skills: [
            "HTML",
            "CSS",
            "JavaScript",
            "React",
            "Node.js",
            "Databases",
          ],
          experience: "0-2 years for junior roles, 3+ years for senior roles",
          education: "Computer Science degree or equivalent experience",
        }),
        salaryRange: "$70,000 - $140,000",
      },
    });

    const dataScientistCareer = await db.career.create({
      data: {
        title: "Data Scientist",
        description:
          "Data scientists analyze and interpret complex data to help organizations make better decisions.",
        requirements: JSON.stringify({
          skills: [
            "Python",
            "R",
            "Statistics",
            "Machine Learning",
            "Data Visualization",
            "SQL",
          ],
          experience: "1-3 years for junior roles, 4+ years for senior roles",
          education:
            "Masters or PhD in Statistics, Mathematics, Computer Science, or related field",
        }),
        salaryRange: "$85,000 - $150,000",
      },
    });

    const uxDesignerCareer = await db.career.create({
      data: {
        title: "UX Designer",
        description:
          "UX Designers create meaningful and relevant experiences for users by researching, prototyping, and designing products.",
        requirements: JSON.stringify({
          skills: [
            "User Research",
            "Wireframing",
            "Prototyping",
            "UI Design",
            "Usability Testing",
          ],
          experience: "1-2 years for junior roles, 3+ years for senior roles",
          education:
            "Degree in Design, HCI, or related field, or equivalent experience",
        }),
        salaryRange: "$65,000 - $130,000",
      },
    });

    // Create career path steps for web developer
    await db.careerPathStep.createMany({
      data: [
        {
          careerId: webDevCareer.id,
          title: "Junior Web Developer",
          description:
            "Entry-level position focusing on building and maintaining websites using HTML, CSS, and JavaScript.",
          level: 1,
          salaryRange: "$60,000 - $80,000",
        },
        {
          careerId: webDevCareer.id,
          title: "Mid-Level Web Developer",
          description:
            "Responsible for developing more complex web applications and mentoring junior developers.",
          level: 2,
          salaryRange: "$80,000 - $110,000",
        },
        {
          careerId: webDevCareer.id,
          title: "Senior Web Developer",
          description:
            "Leads development efforts, makes architectural decisions, and guides team members.",
          level: 3,
          salaryRange: "$110,000 - $140,000",
        },
        {
          careerId: webDevCareer.id,
          title: "Lead Developer / Architect",
          description:
            "Oversees multiple projects, makes high-level design decisions, and sets technology standards.",
          level: 4,
          salaryRange: "$130,000 - $160,000",
        },
      ],
    });

    // Create job openings
    await db.jobOpening.createMany({
      data: [
        {
          careerId: webDevCareer.id,
          title: "Junior Front-End Developer",
          company: "TechCorp",
          location: "New York, NY (Remote)",
          salary: "$70,000 - $85,000",
        },
        {
          careerId: webDevCareer.id,
          title: "Full Stack Developer",
          company: "WebSolutions",
          location: "San Francisco, CA",
          salary: "$90,000 - $120,000",
        },
        {
          careerId: dataScientistCareer.id,
          title: "Junior Data Scientist",
          company: "DataInsights",
          location: "Chicago, IL",
          salary: "$85,000 - $95,000",
        },
        {
          careerId: uxDesignerCareer.id,
          title: "UX/UI Designer",
          company: "DesignPro",
          location: "Austin, TX (Remote)",
          salary: "$75,000 - $90,000",
        },
      ],
    });

    // Create certifications
    await db.certification.createMany({
      data: [
        {
          careerId: webDevCareer.id,
          name: "AWS Certified Developer",
          provider: "Amazon Web Services",
        },
        {
          careerId: webDevCareer.id,
          name: "Meta Front-End Developer Certificate",
          provider: "Meta",
        },
        {
          careerId: dataScientistCareer.id,
          name: "IBM Data Science Professional Certificate",
          provider: "IBM",
        },
        {
          careerId: dataScientistCareer.id,
          name: "Google Data Analytics Certificate",
          provider: "Google",
        },
        {
          careerId: uxDesignerCareer.id,
          name: "Google UX Design Certificate",
          provider: "Google",
        },
      ],
    });

    // Create achievements
    await db.achievement.createMany({
      data: [
        {
          title: "First Module Completed",
          description: "Completed your first learning module",
          icon: "award",
          criteria: JSON.stringify({ type: "module_completion", count: 1 }),
          points: 100,
        },
        {
          title: "Perfect Score",
          description: "Achieved a perfect score on a lesson",
          icon: "star",
          criteria: JSON.stringify({ type: "lesson_score", score: 100 }),
          points: 150,
        },
        {
          title: "Fast Learner",
          description: "Completed a module in less than a week",
          icon: "zap",
          criteria: JSON.stringify({ type: "module_completion_time", days: 7 }),
          points: 200,
        },
        {
          title: "Diagnostic Master",
          description: "Scored over 90% on a diagnostic assessment",
          icon: "check-circle",
          criteria: JSON.stringify({ type: "diagnostic_score", score: 90 }),
          points: 150,
        },
        {
          title: "Project Completed",
          description: "Successfully completed your first project",
          icon: "briefcase",
          criteria: JSON.stringify({ type: "project_completion", count: 1 }),
          points: 200,
        },
      ],
    });

    // Create a demo user with password
    const demoUser = await db.user.create({
      data: {
        email: "demo@example.com",
        firstName: "Demo",
        lastName: "User",
        displayName: "Demo User",
        educationLevel: EducationLevel.COLLEGE,
        bio: "I'm a student learning web development and data science.",
      },
    });

    // Create password for demo user
    const hashedPassword = "";
    await db.$queryRaw`INSERT INTO "Password" ("userId", "hash") VALUES (${demoUser.id}, ${hashedPassword})`;

    // Enroll demo user in a module
    const enrollment = await db.enrollment.create({
      data: {
        userId: demoUser.id,
        moduleId: htmlCssModule.id,
        status: EnrollmentStatus.IN_PROGRESS,
      },
    });

    // Create lesson progress for demo user
    await db.lessonProgress.createMany({
      data: [
        {
          userId: demoUser.id,
          lessonId: htmlIntroLesson.id,
          status: ProgressStatus.COMPLETED,
          score: 95,
          timeSpent: 55,
          lastAccessed: new Date(),
          completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          userId: demoUser.id,
          lessonId: cssBasicsLesson.id,
          status: ProgressStatus.IN_PROGRESS,
          timeSpent: 25,
          lastAccessed: new Date(),
        },
        {
          userId: demoUser.id,
          lessonId: responsiveDesignLesson.id,
          status: ProgressStatus.LOCKED,
        },
      ],
    });

    // Create a project for demo user
    const project = await db.project.create({
      data: {
        userId: demoUser.id,
        title: "Personal Portfolio Website",
        description:
          "Create a responsive personal portfolio website using HTML, CSS, and JavaScript",
        status: ProjectStatus.IN_PROGRESS,
        progress: 40,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        steps: {
          create: [
            {
              title: "Design wireframes",
              description: "Create wireframes for desktop and mobile layouts",
              order: 1,
              status: ProjectStepStatus.COMPLETED,
              completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            },
            {
              title: "Create HTML structure",
              description: "Implement the basic HTML structure for the website",
              order: 2,
              status: ProjectStepStatus.COMPLETED,
              completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            },
            {
              title: "Style with CSS",
              description: "Add CSS styling and make the site responsive",
              order: 3,
              status: ProjectStepStatus.IN_PROGRESS,
            },
            {
              title: "Add JavaScript functionality",
              description: "Implement interactive features with JavaScript",
              order: 4,
              status: ProjectStepStatus.PENDING,
            },
            {
              title: "Test and deploy",
              description:
                "Test the website across different devices and deploy it",
              order: 5,
              status: ProjectStepStatus.PENDING,
            },
          ],
        },
      },
    });

    // Create notifications for demo user
    await db.notification.createMany({
      data: [
        {
          userId: demoUser.id,
          title: "Welcome to the Platform",
          message:
            "Welcome to our learning platform! We're excited to have you join us.",
          type: NotificationType.INFO,
          isRead: true,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
          userId: demoUser.id,
          title: "Lesson Completed",
          message:
            "Congratulations! You've completed the Introduction to HTML lesson.",
          type: NotificationType.SUCCESS,
          isRead: true,
          link: "/learn",
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          userId: demoUser.id,
          title: "Project Update",
          message:
            "You've made progress on your Personal Portfolio Website project!",
          type: NotificationType.INFO,
          isRead: false,
          link: "/projects",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          userId: demoUser.id,
          title: "Project Due Soon",
          message: "Your Personal Portfolio Website project is due in 7 days.",
          type: NotificationType.WARNING,
          isRead: false,
          link: "/projects",
          createdAt: new Date(),
        },
      ],
    });

    // Create a tutor session for demo user
    const tutorSession = await db.tutorSession.create({
      data: {
        userId: demoUser.id,
        title: "Help with CSS Flexbox",
        status: TutorSessionStatus.COMPLETED,
        scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        endedAt: new Date(
          Date.now() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
        ), // 1 hour after start
        messages: {
          create: [
            {
              sender: MessageSender.SYSTEM,
              content:
                "Welcome to your tutoring session! How can I help you today?",
              sentAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            },
            {
              sender: MessageSender.USER,
              content:
                "I'm having trouble understanding CSS Flexbox. Can you explain how it works?",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.AI,
              content:
                "Of course! Flexbox is a one-dimensional layout method for arranging items in rows or columns. Items flex (expand) to fill additional space or shrink to fit into smaller spaces.\n\nThe key properties are:\n\n- `display: flex` on the container\n- `flex-direction` (row or column)\n- `justify-content` (aligns along the main axis)\n- `align-items` (aligns along the cross axis)\n\nWould you like me to show some examples?",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.USER,
              content:
                "Yes, please show me examples for centering elements and creating a navigation bar.",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.AI,
              content:
                'Here\'s how to center an element with flexbox:\n\n```css\n.container {\n  display: flex;\n  justify-content: center; /* horizontal centering */\n  align-items: center; /* vertical centering */\n  height: 100vh; /* full viewport height */\n}\n```\n\nAnd here\'s a simple navigation bar:\n\n```css\nnav {\n  display: flex;\n  justify-content: space-between; /* items spread across the container */\n}\n\nnav ul {\n  display: flex;\n  list-style: none;\n  gap: 20px; /* space between items */\n}\n```\n\n```html\n<nav>\n  <div class="logo">MyWebsite</div>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Services</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>\n```\n\nDoes this help clarify how flexbox works?',
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 20 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.USER,
              content:
                "Yes, that's really helpful! I think I understand it now. Thank you!",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 25 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.AI,
              content:
                "You're welcome! Feel free to practice with these examples, and if you have any more questions about flexbox or CSS in general, don't hesitate to ask. Good luck with your project!",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000
              ),
            },
            {
              sender: MessageSender.SYSTEM,
              content:
                "This tutoring session has ended. You can start a new session anytime you need help with your learning.",
              sentAt: new Date(
                Date.now() - 3 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
              ),
            },
          ],
        },
      },
    });

    console.log("Database seed completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error: "Failed to seed database" };
  }
}
