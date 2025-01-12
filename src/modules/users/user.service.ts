import { Prisma } from "@prisma/client";
import { HttpError } from "../../errors/HttpError";
import { UserRepository } from "./repositories/user.repository";
import {
  CreateUserDTO,
  FilterUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
} from "./user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    // Check if user exists
    const existingUser = await this.userRepository.findAll({
      OR: [{ email: data.email }, { uid: data.username }],
    });
    if (existingUser) {
      throw new HttpError("User already exists with this email or uid", 400);
    }

    // Hash password
    // const hashedPassword = ""//await hash(data.password, 10);

    // Create user
    const user = await this.userRepository.create({
      ...data,
    });

    return new UserResponseDTO(user);
  }

  async getProfile(userId: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return new UserResponseDTO(user);
  }

  async updateProfile(
    userId: string,
    data: UpdateUserDTO
  ): Promise<UserResponseDTO> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    // If email is being updated, check if new email is already in use
    if (data.email && data.email !== existingUser.email) {
      const emailInUse = await this.userRepository.findByEmail(data.email);
      if (emailInUse) {
        throw new HttpError("Email already in use", 400);
      }
    }

    // Update user
    const updatedUser = await this.userRepository.update(userId, data);
    if (!updatedUser) {
      throw new Error("Error updating user");
    }
    return new UserResponseDTO(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepository.delete(userId);
  }

  async getUserById(id: string): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findById(id);
    return user ? new UserResponseDTO(user) : null;
  }

  async getUser(filter?: FilterUserDTO): Promise<UserResponseDTO[]> {
    const user = await this.userRepository.findAll(filter);
    return user.map((u) => new UserResponseDTO(u));
  }
}
