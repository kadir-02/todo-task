import express from "express";
import taskRoutes from "./routes/task.route";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  return res.json({ message: "health api is running" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

export default app;
