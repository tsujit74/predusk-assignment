import dotenv from "dotenv";
dotenv.config();

import connectDB from "../src/config/db";
import Profile from "../src/models/Profile";
import Project from "../src/models/Project";

async function seed() {
  try {
    await connectDB();
    await Profile.deleteMany({});
    await Project.deleteMany({});

    const profile = await Profile.create({
      name: "Sujit Thakur",
      email: "tsujeet440@gmail.com",
      education: [
        "B.Tech in Computer Science & Engineering (CSE) – Siddharth Institute Of Engineering & Technology"
      ],
      skills: [
        "Next.js", "React", "Redux", "TypeScript", "Java", "Node.js",
        "MongoDB", "PostgreSQL", "SQL", "Tailwind CSS", "Git", "GitHub",
        "Postman", "GraphQL"
      ],
      links: {
        github: "https://github.com/tsujit74",
        linkedin: "https://www.linkedin.com/in/sujit/",
        portfolio: "https://sujit-porttfolio.vercel.app/"
      },
      work: [
        {
          company: "AD Infocom System",
          role: "Web Development Intern",
          startDate: new Date("2024-10-01"),
          endDate: new Date("2024-08-31"),
          description: "Web development internship experience focusing on MERN stack."
        },
        {
          company: "Freelance Projects",
          role: "Full Stack Developer",
          startDate: new Date("2023-08-01"),
          description: "Built and deployed multiple full stack applications as a freelancer."
        }
      ]
    });

    const projects = [
      {
        profile: profile._id,
        title: "Quizzy Full Stack",
        description: "Secure, interactive quiz app built with MERN stack, with full-screen enforcement, tab-switch detection, and DevTools blocking.",
        links: [
          "https://online-quiz-maker-np09.onrender.com",
          "https://github.com/tsujit74/quizzy-fullstack"
        ],
        skills: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "JavaScript"]
      },
      {
        profile: profile._id,
        title: "CONCRETION Full Stack",
        description: "Social networking platform with secure authentication and responsive UI, allowing friend requests.",
        links: [
          "https://concretion-project.vercel.app",
          "https://github.com/tsujit74/concretion"
        ],
        skills: ["Node.js", "Express", "MongoDB", "JavaScript", "CSS", "HTML"]
      },
      {
        profile: profile._id,
        title: "Personalized Dashboard Frontend",
        description: "Responsive Next.js dashboard showing personalized content like news, movies, and social posts, built with TypeScript and Redux Toolkit.",
        links: [
          "https://personalized-dashboard-eight.vercel.app",
          "https://github.com/tsujit74/personalized-dashboard"
        ],
        skills: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"]
      },
      {
        profile: profile._id,
        title: "Apna Video Full Stack",
        description: "Real-time video conferencing application using WebRTC, with JWT authentication and dynamic room management.",
        links: [
          "https://apnavideofrontend.onrender.com",
          "https://github.com/tsujit74/apna-video"
        ],
        skills: ["React.js", "Node.js", "Express.js", "WebRTC", "MongoDB", "CSS"]
      },
      {
        profile: profile._id,
        title: "Wanderlust Full Stack",
        description: "Travel platform with TomTom Maps integration, trending destinations, and user authentication via Passport.",
        links: [
          "https://project-wander.onrender.com",
          "https://github.com/tsujit74/wanderlust"
        ],
        skills: ["Node.js", "Express", "MongoDB", "JavaScript", "CSS", "HTML"]
      },
      {
        profile: profile._id,
        title: "Spotify Clone Frontend",
        description: "Responsive front-end mimicking Spotify UI using plain HTML and CSS.",
        links: [
          "https://tsujit74.github.io",
          "https://github.com/tsujit74/spotify-clone-frontend"
        ],
        skills: ["HTML", "CSS"]
      }
    ];

    // Triple the projects
    const tripledProjects = [...projects, ...projects, ...projects];

    await Project.insertMany(tripledProjects);

    console.log("Seed completed with full portfolio!");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
