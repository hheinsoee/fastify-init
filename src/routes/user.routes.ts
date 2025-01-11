import { FastifyInstance } from "fastify";
import { UserService } from "../modules/users/user.service";
import { UserRepository } from "../modules/users/repositories/user.repository";
import { PrismaClient } from "@prisma/client";
import { UserController } from "../modules/users/user.controller";

export async function userRoutes(fastify: FastifyInstance) {
  // Initialize Prisma client
  const prisma = new PrismaClient();

  // Initialize repository with Prisma
  const userRepository = new UserRepository(prisma);

  // Initialize service with repository
  const userService = new UserService(userRepository);

  // Initialize controller with service
  const userController = new UserController(userService);

  // All these routes are already protected by the auth middleware
  // Public routes
  fastify.post("/users", userController.createUser.bind(userController));
  // fastify.get("/users/search", userController.searchUsers.bind(userController));
  fastify.get("/users/:id", userController.getUserById.bind(userController));

  // Protected routes
  fastify.get(
    "/profile",
    {
      // onRequest: [fastify.authenticate]
    },
    userController.getProfile.bind(userController)
  );

  fastify.put(
    "/profile",
    {
      // onRequest: [fastify.authenticate]
    },
    userController.updateProfile.bind(userController)
  );

  fastify.delete(
    "/profile",
    {
      // onRequest: [fastify.authenticate]
    },
    userController.deleteUser.bind(userController)
  );
  // You can also add individual auth middleware to specific routes if needed
  // fastify.post(
  //   "/sensitive-action",
  //   {
  //     preHandler: [
  //       async (request, reply) => {
  //         // Additional auth checks if needed
  //       },
  //     ],
  //   },
  //   userController.sensitiveAction.bind(userController)
  // );

  // Clean up Prisma when the server closes
  fastify.addHook("onClose", async () => {
    await prisma.$disconnect();
  });
}
