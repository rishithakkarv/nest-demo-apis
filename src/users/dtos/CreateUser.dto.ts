import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  createdAt: Date;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
