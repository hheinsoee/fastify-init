import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service";
import { User } from "../types/user.types";

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Access authenticated user data
      const user = request.user;
      if (!user?.uid) {
        throw new Error("user Id need");
      }
      return await this.userService.getUser(user?.uid);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error fetching profile",
      });
    }
  }

  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;
      const updateData = request.body as Partial<User>;
      if (!user?.uid) {
        throw new Error("user Id need");
      }
      const updatedProfile = await this.userService.updateUser(
        user?.uid,
        updateData
      );
      return { success: true, profile: updatedProfile };
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error updating profile",
      });
    }
  }

  async sensitiveAction(request: FastifyRequest, reply: FastifyReply) {
    try {
      const user = request.user;
      if (!user?.uid) {
        throw new Error("user Id need");
      }
      const result = await this.userService.performSensitiveAction(user?.uid);
      return { success: true, result };
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error updating profile",
      });
    }
  }
}
