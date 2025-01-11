import { UserRepository } from "../repositories/user.repository";
import { CreateUserDTO, UserResponseDTO } from "../user.dto";

// users/use-cases/create-user.usecase.ts
export class CreateUserUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute(data: CreateUserDTO): Promise<UserResponseDTO> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // const hashedPassword = data.password//await hashPassword(data.password);
        const user = await this.userRepository.create({
            ...data,
            // password: hashedPassword
        });

        return new UserResponseDTO(user);
    }
}
