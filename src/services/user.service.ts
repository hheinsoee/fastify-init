import { UserModel } from '../models/user.model';
import { User } from '../types/user.types';

export class UserService {
  constructor(private userModel: UserModel) {}

  async getUser(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}