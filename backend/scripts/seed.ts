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
      education: ["B.Tech in Computer Science"],
      skills: ["Node.js", "TypeScript", "Express", "MongoDB", "React", "Next.js"],
      links: {
        github: "https://github.com/tsujit74",
        linkedin: "https://www.linkedin.com/in/sujit/",
        portfolio: "https://sujit-porttfolio.vercel.app/"
      },
      work: [
        {
          company: "Example Co",
          role: "Intern",
          startDate: new Date("2024-01-01"),
          description: "Backend & API work"
        }
      ]
    });

    const projects = [
      {
        profile: profile._id,
        title: "Me-API Playground",
        description: "Profile + Projects API for Track A assessment",
        links: ["https://github.com/tsujit74/me-api-playground"],
        skills: ["Node.js", "TypeScript", "Express", "MongoDB"]
      },
      {
        profile: profile._id,
        title: "Book Finder",
        description: "React app using Open Library API",
        links: ["https://github.com/tsujit74/book-finder"],
        skills: ["React", "Next.js", "Node.js"]
      },
      {
        profile: profile._id,
        title: "Notes App",
        description: "Simple CRUD notes app",
        links: ["https://github.com/tsujit74/notes-app"],
        skills: ["Express", "MongoDB", "TypeScript"]
      }
    ];

    await Project.insertMany(projects);

    console.log("Seed completed ✅");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
