import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.uid; // Assuming auth middleware sets user
      if (!userId) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "User not authenticated",
        });
      }

      const profile = await this.userService.getProfile(userId);
      return reply.code(200).send(profile);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error fetching profile",
      });
    }
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = request.body as CreateUserDTO;

      // Validate request body
      if (!data.email) {
        return reply.code(400).send({
          error: "Bad Request",
          message: "Email and password are required",
        });
      }

      const newUser = await this.userService.createUser(data);
      return reply.code(201).send(newUser);
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error creating user",
      });
    }
  }

  async updateProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.uid;
      if (!userId) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "User not authenticated",
        });
      }

      const updateData = request.body as UpdateUserDTO;

      // Validate update data
      if (Object.keys(updateData).length === 0) {
        return reply.code(400).send({
          error: "Bad Request",
          message: "No update data provided",
        });
      }

      const updatedProfile = await this.userService.updateProfile(
        userId,
        updateData
      );

      return reply.code(200).send(updatedProfile);
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error updating profile",
      });
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.uid;
      if (!userId) {
        return reply.code(401).send({
          error: "Unauthorized",
          message: "User not authenticated",
        });
      }

      await this.userService.deleteUser(userId);
      return reply.code(204).send();
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error deleting user",
      });
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const user = await this.userService.getUserById(id);
      if (!user) {
        return reply.code(404).send({
          error: "Not Found",
          message: "User not found",
        });
      }

      return reply.code(200).send(user);
    } catch (error) {
      request.log.error(error);
      return reply.code(500).send({
        error: "Internal Server Error",
        message: "Error fetching user",
      });
    }
  }

  // async searchUsers(request: FastifyRequest, reply: FastifyReply) {
  //   try {
  //     const { query, page, limit } = request.query as {
  //       query?: string;
  //       page?: number;
  //       limit?: number;
  //     };

  //     const users = await this.userService.searchUsers({
  //       query: query || '',
  //       page: Number(page) || 1,
  //       limit: Number(limit) || 10
  //     });

  //     return reply.code(200).send(users);
  //   } catch (error) {
  //     request.log.error(error);
  //     return reply.code(500).send({
  //       error: "Internal Server Error",
  //       message: "Error searching users"
  //     });
  //   }
  // }
}
