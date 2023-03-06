import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const app = Fastify();

app.register(appRoutes);
app.register(cors);

app
  .listen({
    port: 3333,
    host: "192.168.1.105",
  })
  .then(() => {
    console.log("HTTP Server");
  });
