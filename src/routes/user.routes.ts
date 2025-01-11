import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

export async function userRoutes(fastify: FastifyInstance) {
  const userModel = new UserModel();
  const userService = new UserService(userModel);
  const userController = new UserController(userService);

  fastify.get('/:id', userController.getUser.bind(userController));
}