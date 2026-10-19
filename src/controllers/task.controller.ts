import { Request, Response } from "express";
import { Task } from "../models/task.model";

type AuthenticatedRequest = Request & { user: { id: string } };

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const tasks = await Task.find({ user: userId });
    return res.status(200).json({ data: tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error getting task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { title, description } = req.body;
    const task = await Task.create({ title, description, user: userId });
    return res.status(201).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const { title, description } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description },
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user.id;
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ data: task });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task" });
  }
};
