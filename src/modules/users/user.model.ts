import { User } from "../../types/user.types";
import prisma from "../../../prisma/client";
export class UserModel {
  async findById(id: string) {
    return prisma.users.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, userData: Partial<User>) {
    return prisma.users.update({
      where: {
        id: id,
      },
      data: userData,
    });
  }
}
