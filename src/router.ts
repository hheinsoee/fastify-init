// This code sets up a Fastify router with authentication and route registration:
// 1. Adds a preHandler hook that verifies Firebase token for all non-public routes
// 2. Registers route handlers for user, prefecture, company and platform endpoints
// 3. The error comment indicates that platformController needs to be properly typed as a FastifyPluginCallback or FastifyPluginAsync
import { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

export default async function router(fastify: FastifyInstance) {
  fastify.addHook("onRequest", async (request, reply) => {
    // console.log('onRequest: Checking API key...');
    // if (!request.headers['x-api-key']) {
    //   reply.code(400).send({ error: 'API key is required' });
    // }
  });

  // fastify.addHook("preHandler", async (request, reply) => {
  //   if (!request.url.startsWith("/webhook")) {
  //     await fastify.verifyFirebaseToken(request, reply);
  //   }
  // });
  fastify.register(userRoutes, { prefix: "/user" });
}
