import { UserModel } from "../models/user.model";
import { User } from "../types/user.types";

export class UserService {
  constructor(private userModel: UserModel) {}

  async getUser(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return this.userModel.update(id, userData);
  }

  async performSensitiveAction(id: string): Promise<void> {
    // Add security checks and validation before performing sensitive operations
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    // Perform sensitive action logic here
  }
}
