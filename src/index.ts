import fastify from "fastify";
import configPlugin from "./plugins/config";
const app = fastify({
  logger: !!(process.env.NODE_ENV !== "development"),
  exposeHeadRoutes: true,
});
app.register(configPlugin);
app.get("/", (request, reply) => {
  reply.send({ env: request.server });
});
app.setErrorHandler((error, request, reply) => {
  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  reply.status(statusCode).send({
    message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  });
});
const port = Number(process.env.PORT);
if (!port) {
  throw new Error("need to conf env 'PORT'");
}
app.listen({ port: port || 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
console.log(`🚀  Fastify server running on port http://localhost:${port}`);
