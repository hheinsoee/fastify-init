// This file was auto-generated by prisma-generator-typescript-interfaces

export interface User {
  id: string;
  email: string;
  uid: string;
  created_at: Date;
  updated_at: Date;
  post?: Post[];
}

export interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  created_id: string;
  user?: User;
}
