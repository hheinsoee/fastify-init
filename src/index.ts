import fastify from "fastify";
const app = fastify({ logger: true });
app.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
