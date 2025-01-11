import { UserRepository } from "./repositories/user.repository";
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from "./user.dto";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    // Check if user exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
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
      throw new Error("User not found");
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
        throw new Error("Email already in use");
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
}
