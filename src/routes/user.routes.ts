import { FastifyInstance } from "fastify";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

export async function userRoutes(fastify: FastifyInstance) {
  const userModel = new UserModel();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);

  // All these routes are already protected by the auth middleware
  fastify.get("/profile", userController.getProfile.bind(userController));
  fastify.put("/profile", userController.updateProfile.bind(userController));

  // You can also add individual auth middleware to specific routes if needed
  fastify.post(
    "/sensitive-action",
    {
      preHandler: [
        async (request, reply) => {
          // Additional auth checks if needed
        },
      ],
    },
    userController.sensitiveAction.bind(userController)
  );
}
