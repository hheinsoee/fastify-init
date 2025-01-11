import { User } from "@prisma/client";
import { CreateUserDTO, UpdateUserDTO } from "../user.dto";

// users/interfaces/user.repository.interface.ts
export interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: string, data: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<User[]>;
}
