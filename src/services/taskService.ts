import { Task } from "../models/task";

let tasks: Task[] =  [
  { id: 1, title: "Aprender Node.js", completed: false },
  { id: 2, title: "Hacer CRUD con TypeScript", completed: true }
];
let idCounter = 1;

export const getAllTasks = (): Task[] => tasks;

export const getTaskById = (id: number): Task | undefined =>
  tasks.find((t) => t.id === id);

export const createTask = (title: string): Task => {
  const newTask: Task = { id: idCounter++, title, completed: false };
  tasks.push(newTask);
  return newTask;
};

export const updateTask = (id: number, data: Partial<Task>): Task | null => {
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;
  Object.assign(task, data);
  return task;
};

export const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
};
