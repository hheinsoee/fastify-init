import * as dotenv from "dotenv";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import path from "path";
import fs from "fs";

dotenv.config();

declare module "fastify" {
  interface FastifyInstance {
    config: {
      server: {
        port: number;
        nodeEnv: string;
      };
      firebase: {
        serviceAccount: any; // You can define a proper type for your service account
      };
    };
  }
}

const configPlugin: FastifyPluginAsync = async (server, options) => {
  const getServiceAccount = () => {
    try {
      const serviceAccountPath = path.join(
        __dirname,
        "../../config/serviceAccountKey.json"
      );

      if (!fs.existsSync(serviceAccountPath)) {
        server.log.error(`${serviceAccountPath} not found`);
        // If service account file doesn't exist, fall back to environment variables
        if (
          !process.env.FIREBASE_PROJECT_ID ||
          !process.env.FIREBASE_PRIVATE_KEY ||
          !process.env.FIREBASE_CLIENT_EMAIL
        ) {
          throw new Error(
            "Neither service account file nor environment variables found"
          );
        }

        return {
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        };
      }

      return JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
    } catch (error) {
      server.log.error("Error loading service account:", error);
      throw error;
    }
  };

  const config = {
    server: {
      port: parseInt(process.env.PORT || "3000", 10),
      nodeEnv: process.env.NODE_ENV || "development",
    },
    firebase: {
      serviceAccount: getServiceAccount(),
    },
  };

  server.decorate("config", config);
};

export default fp(configPlugin);
