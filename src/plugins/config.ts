import * as dotenv from "dotenv";
import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";

dotenv.config(); // Load the .env file

const configPlugin: FastifyPluginAsync = async (server, options) => {
  server.decorate("config", process.env);
};

export default fp(configPlugin);
