import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "../services/user.service";
import { HttpError } from "../errors/HttpError";

export class UserController {
  constructor(private userService: UserService) {}

  async getUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    const user = await this.userService.getUser(request.params.id);
    if (!user) {
      throw new HttpError("User not found", 404);
    }
    return reply.send(user);
  }
}
