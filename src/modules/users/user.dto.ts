// DTO for creating a new user
export class CreateUserDTO {
  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {}
}

// DTO for updating a user
export class UpdateUserDTO {
  constructor(
    public username?: string,
    public email?: string
  ) {}
}

// DTO for user response
export class UserResponseDTO {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public createdAt: Date
  ) {}
}
