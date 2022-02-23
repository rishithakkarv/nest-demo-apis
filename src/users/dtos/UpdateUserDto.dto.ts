import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
