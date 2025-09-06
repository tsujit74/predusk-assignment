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
app.use(morgan("combined"));
app.use(rateLimiter);

// routes
app.use("/api/profile", profileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/", miscRoutes);

// error handler
app.use(errorHandler);

export default app;
