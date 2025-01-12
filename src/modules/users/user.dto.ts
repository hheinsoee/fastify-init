import { Prisma, User } from "@prisma/client";
import { HttpError } from "../../errors/HttpError";

// DTO for creating a new user
export class CreateUserDTO {
  public username: string;
  public email: string;
  constructor(user: User) {
    if (!user.email) {
      throw new Error("Email is required");
    }
    if (!user.uid) {
      throw new HttpError("uid is required", 400);
    }
    this.username = user.uid;
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

export class FilterUserDTO implements Prisma.UserWhereInput {
  // id?: string;
  // email?: string;
  // created_at?: Date;
  // AND?: Prisma.UserWhereInput[];
  // OR?: Prisma.UserWhereInput[];
  // NOT?: Prisma.UserWhereInput[];
}
export class RegisterUserDTO {
  public username: string;
  public email: string;
  constructor(user: User) {
    this.username = user.email;
    this.email = user.email;
  }
}
