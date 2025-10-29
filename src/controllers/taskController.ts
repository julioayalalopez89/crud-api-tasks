import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "0");
  const task = await taskService.getTaskById(id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const createTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required" });
  const task = await taskService.createTask(title);
  res.status(201).json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "0");
  const updated = await taskService.updateTask(id, req.body);
  if (!updated) return res.status(404).json({ message: "Task not found" });
  res.json(updated);
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id ?? "0");
  await taskService.deleteTask(id);
  res.status(204).send();
};
