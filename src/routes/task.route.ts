import Router from "express";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { Authentication } from "../middlewares/auth.middleware";

const router = Router();

router.use(Authentication);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
