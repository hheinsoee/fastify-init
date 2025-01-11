import { User } from '../types/user.types';

export class UserModel {
  private users: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }
}
