import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  createdAt: Date;
  @Exclude()
  password: string;

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial)
  }
}
