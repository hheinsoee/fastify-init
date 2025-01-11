import { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { authMiddleware } from "./middlewares/auth";

export default async function router(fastify: FastifyInstance) {
  // Public routes
  fastify.register(async (fastify) => {
    fastify.get("/health", async () => ({ status: "ok" }));
  });

  // Protected routes
  fastify.register(async (fastify) => {
    // Apply auth middleware to all routes in this context
    fastify.addHook("preHandler", authMiddleware);

    // Register user routes with authentication
    fastify.register(userRoutes, { prefix: "/user" });
  });
}
