import { UserRepository } from "../repositories/user.repository";
import { UpdateUserDTO, UserResponseDTO } from "../user.dto";

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    // Business validation
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    // Business logic
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new Error("Email already in use");
      }
    }

    const updatedUser = await this.userRepository.update(id, data);
    if (!updatedUser) {
      throw new Error("Error updating user");
    }
    return new UserResponseDTO(updatedUser);
  }
}
