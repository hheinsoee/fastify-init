import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyPlugin from "fastify-plugin";
import admin from "firebase-admin";

import serviceAccount from "./../../serviceAccountKey.json";

async function firebaseAuthPlugin(fastify: FastifyInstance): Promise<void> {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });

  fastify.decorate(
    "verifyFirebaseToken",
    async function (
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void> {
      // console.dir(request.headers.cookie);
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        reply.status(401).send({ error: "Unauthorized" });
        return;
      }

      const idToken = authHeader.split("Bearer ")[1];
      // console.log(idToken);
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        request.googleUser = decodedToken;
        // console.log(decodedToken);
      } catch (error) {
        console.error({ AuthErr: error });
        reply.status(401).send({ error: "Unauthorized: Invalid token" });
      }
    }
  );
}

export default fastifyPlugin(firebaseAuthPlugin);

declare module "fastify" {
  interface FastifyInstance {
    verifyFirebaseToken: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }

  interface FastifyRequest {
    googleUser?: admin.auth.DecodedIdToken;
  }
  interface FastifyRequest {
    routerPath?: string;
  }
}
