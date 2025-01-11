import { IUserRepository } from "../interfaces/user.repository.interface";
import { UserResponseDTO } from "../user.dto";

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return new UserResponseDTO(user);
  }
}
