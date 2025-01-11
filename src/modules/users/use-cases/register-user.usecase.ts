import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { RegisterUserDTO, UserResponseDTO } from "../user.dto";

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository
    // private emailService: EmailService
  ) {}

  async execute(data: RegisterUserDTO): Promise<UserResponseDTO> {
    // Business validation
    await this.validateUserData(data);

    // Business logic
    const user = await this.createUser(data);

    // Side effects
    // await this.sendWelcomeEmail(user);

    return new UserResponseDTO(user);
  }

  private async validateUserData(data: RegisterUserDTO) {
    // Validation logic
  }

  private async createUser(data: RegisterUserDTO) {
    // User creation logic
    const user = await this.userRepository.create(data);
    return user;
  }

  private async sendWelcomeEmail(user: User) {
    // Email sending logic
  }
}
