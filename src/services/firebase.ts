// src/services/firebase.ts
import { FastifyInstance } from "fastify";
import * as admin from "firebase-admin";

export const initializeFirebase = (server: FastifyInstance) => {
  const { serviceAccount } = server.config.firebase;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return admin;
};
