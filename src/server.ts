import bodyParser from "body-parser";
import cors from "cors";

import express from "express"; // para Playground
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { renderPlaygroundPage } from "@apollographql/graphql-playground-html";

import app from "./app";
import { createSampleTasks } from "./services/taskService";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

/* ---------- GraphQL schema ---------- */
const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    done: Boolean!
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    createTask(title: String!): Task!
  }
`;

/* ---------- Resolvers ---------- */
const resolvers = {
  Query: {
    tasks: async () => await prisma.task.findMany(),
  },
  Mutation: {
    createTask: async (_: any, { title }: { title: string }) => {
      return await prisma.task.create({
        data: { title, done: false },
      });
    },
  },
};

/* ---------- Start servers ---------- */
const PORT = Number(process.env.PORT) || 4000; // REST (tu app express)
const GRAPHQL_PORT = Number(process.env.GRAPHQL_PORT) || 4001; // GraphQL standalone

async function startServer() {
  try {
    await createSampleTasks();

    // 1) Iniciar REST (Express)
    app.use(bodyParser.json());
    app.use(cors());
    app.listen(PORT, () => {
      console.log(`🚀 REST corriendo en http://localhost:${PORT}`);
    });

    // 2) Iniciar GraphQL como servidor independiente
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => ({ prisma, req }),
      listen: { port: GRAPHQL_PORT },
    });

    console.log(`🪐 GraphQL listo en ${url}`);

    // 3) Servir Playground local usando Express en el mismo puerto
    const playgroundApp = express();
    playgroundApp.get("/playground", (_req, res) => {
      res.setHeader("Content-Type", "text/html");
      res.send(
        renderPlaygroundPage({
          endpoint: url, // apunta al endpoint real de GraphQL
        })
      );
    });
    playgroundApp.listen(GRAPHQL_PORT + 1, () => {
      console.log(`🛠 Playground listo en http://localhost:${GRAPHQL_PORT + 1}/playground`);
    });
  } catch (err) {
    console.error("Error starting servers:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();
