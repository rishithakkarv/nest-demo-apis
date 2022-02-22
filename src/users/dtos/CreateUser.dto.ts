import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  createdAt: Date;
}
