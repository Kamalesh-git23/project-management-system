import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import attachmentRoutes from "./routes/attachmentRoutes.js";

import swaggerSpec from "./config/swagger.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.set("trust proxy", 1);

app.use( cors( { origin: "*", credentials: true,} ) );

app.use(express.json());


app.use( express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Project Management API Running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "UP",
    timestamp: new Date(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/attachments", attachmentRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);

  console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);

  console.log(`❤️ Health Check: http://localhost:${PORT}/health`);
});