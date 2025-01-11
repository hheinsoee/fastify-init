// users/repositories/user.repository.ts
import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../user.dto";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { ulid } from "ulidx";

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: ulid(),
        email: data.email,
        uid: data.username,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
