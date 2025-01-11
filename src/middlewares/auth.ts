import { FastifyRequest, FastifyReply } from "fastify";

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await request.server.verifyFirebaseToken(request, reply);
  } catch (error) {
    // Error handling is already done in the plugin
    return;
  }
};
