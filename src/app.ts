import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes";
import errorHandler from "./middlewares/errorHandler";

///////////////SWAGGER///////////////////////
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - completed
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la tarea
 *         title:
 *           type: string
 *           description: Título de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de completado
 */


const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API de Tareas",
      version: "1.0.0",
      description: "API para gestionar tareas con Node.js y TypeScript",
    },
     servers: [
      { url: "http://localhost:4000" },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/app.ts"], // Aquí indicamos dónde buscar los comentarios
};
const swaggerSpec = swaggerJsDoc(swaggerOptions);


////////////////////////////




const app = express();

//SWWAGGER
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
//app.use("/api/tasks", taskRoutes);
app.use("/tasks", taskRoutes);

// Manejo de errores
app.use(errorHandler);

export default app;



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));