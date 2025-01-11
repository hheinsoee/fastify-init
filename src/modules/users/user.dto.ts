import { User } from "@prisma/client";

// DTO for creating a new user
export class CreateUserDTO {
  public username: string;
  public email: string;
  constructor(user: User) {
    this.username = user.email;
    this.email = user.email;
  }
}

// DTO for updating a user
export class UpdateUserDTO {
  public username?: string;
  public email?: string;
  constructor(user: User) {
    this.username = user.email;
    this.email = user.email;
  }
}

// DTO for user response
export class UserResponseDTO {
  public id: string;
  public username: string;
  public email: string;
  public createdAt: Date;
  constructor(user: User) {
    this.id = user.id;
    this.username = user.email;
    this.email = user.email;
    this.createdAt = user.created_at;
  }
}

export class RegisterUserDTO {
  public username: string;
  public email: string;
  constructor(user: User) {
    this.username = user.email;
    this.email = user.email;
  }
}
