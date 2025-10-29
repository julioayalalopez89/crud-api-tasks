import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

export const getTaskById = async (id: number) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const createTask = async (title: string) => {
  return await prisma.task.create({ data: { title } });
};

export const updateTask = async (id: number, data: { title?: string; done?: boolean }) => {
  return await prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: number) => {
  await prisma.task.delete({ where: { id } });
  return true;
};


export async function createSampleTasks() {
  // Verifica si ya existen tasks
  const count = await prisma.task.count();
  if (count > 0) return; // Si hay datos, no hacer nada

  // Crear tasks de prueba
  await prisma.task.createMany({
    data: [
       { title: "Aprender TypeScript" },
       { title: "Configurar Prisma" },
       { title: "Crear API CRUD" },
       { title: "Probar Swagger" },
    ],
  });

  console.log("✅ Tasks de prueba creadas");
}
