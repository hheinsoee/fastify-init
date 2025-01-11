// src/routes/protected.routes.ts
import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/auth";

export default async function protectedRoutes(fastify: FastifyInstance) {
  // Protect single route
  fastify.get(
    '/protected',
    {
      preHandler: [authMiddleware]
    },
    async (request, reply) => {
      // Access user info from request
      const user = request.user;
      return { message: `Hello ${user?.email}` };
    }
  );

  // Protect all routes in a prefix
  fastify.register(async (fastify) => {
    // This will run authentication for all routes in this context
    fastify.addHook('preHandler', authMiddleware);

    fastify.get('/admin', async (request, reply) => {
      return { message: 'Admin area' };
    });

    fastify.get('/profile', async (request, reply) => {
      return { user: request.user };
    });
  }, { prefix: '/api' });
}
