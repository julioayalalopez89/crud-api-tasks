import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const getTasks = (req: Request, res: Response) => {
  res.json(taskService.getAllTasks());
};

export const getTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  const task = taskService.getTaskById(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const task = taskService.createTask(title);
  res.status(201).json(task);
};

export const updateTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  const updated = taskService.updateTask(id, req.body);
  if (!updated) return res.status(404).json({ message: "Task not found" });
  res.json(updated);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "");
  const deleted = taskService.deleteTask(id);
  if (!deleted) return res.status(404).json({ message: "Task not found" });
  res.status(204).send();
};
