import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimiter from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";

import profileRoutes from "./routes/profile";
import projectRoutes from "./routes/projects";
import miscRoutes from "./routes/misc";

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 400,
  })
);

app.use(rateLimiter);

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/", miscRoutes);

// Catch-all for unknown routes
app.use((req, res, next) => {
  console.warn(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
