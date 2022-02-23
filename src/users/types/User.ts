import { Exclude } from 'class-transformer';

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  password: string;
}

export class SerializeUser {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  @Exclude()
  password: string;

  constructor(partial: Partial<SerializeUser>) {
    Object.assign(this, partial);
  }
}
