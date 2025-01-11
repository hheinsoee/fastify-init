import configPlugin from "./plugins/config";
import firebaseAuthPlugin from "./plugins/firebase-auth.ts";
import fastify from "fastify";
import router from "./router";
import fastifyCors from "@fastify/cors";

const app = fastify({
  logger: !!(process.env.NODE_ENV !== "development"),
  exposeHeadRoutes: true,
});

app.register(fastifyCors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
});

app.register(configPlugin);
app.register(firebaseAuthPlugin);
app.register(router);

const port = Number(process.env.FASTIFY_PORT);
if (!port) {
  throw new Error("need to conf env 'FASTIFY_PORT'");
}
app.setErrorHandler((error, request, reply) => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  reply.status(statusCode).send({
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  });
});

app.listen({ port: Number(port), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

console.log(`🚀  Fastify server running on port http://localhost:${port}`);
