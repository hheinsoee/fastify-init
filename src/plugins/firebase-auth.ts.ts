import fp from "fastify-plugin";
import { FastifyRequest, FastifyReply } from "fastify";
import * as admin from "firebase-admin";

declare module "fastify" {
  interface FastifyInstance {
    verifyFirebaseToken: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<admin.auth.DecodedIdToken>;
  }
}

export interface FirebaseUser {
  uid: string;
  email?: string;
}

declare module "fastify" {
  interface FastifyRequest {
    user?: FirebaseUser;
  }
}

const firebaseAuthPlugin = fp(async (fastify) => {
  // Initialize Firebase Admin if not already initialized
  if (!admin.apps.length) {
    const { serviceAccount } = fastify.config.firebase;
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  fastify.decorate(
    "verifyFirebaseToken",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
          throw new Error("No authorization header");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
          throw new Error("No token provided");
        }

        const decodedToken = await admin.auth().verifyIdToken(token);

        // Attach user to request
        request.user = {
          uid: decodedToken.uid,
          email: decodedToken.email,
        };

        return decodedToken;
      } catch (error) {
        reply.code(401).send({
          error: "Unauthorized",
          message: "Invalid or expired token",
        });
        throw error;
      }
    }
  );
});

export default firebaseAuthPlugin;
