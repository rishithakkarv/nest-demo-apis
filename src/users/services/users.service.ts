import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { SerializeUser } from '../types/User';
import { FormatedResponse, FormatResponse } from '../../utils/FormatResponse';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async allUsers(): Promise<FormatedResponse<UserEntity[]>> {
    const allUsers = await this.userRepo.find();

    const userData: any = allUsers.map((user) => new SerializeUser(user));

    return FormatResponse<UserEntity[]>(true, userData, 'all users', HttpStatus.OK);
  }

  async findUserById(id: number): Promise<FormatedResponse<UserEntity>> {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      return FormatResponse<UserEntity>(false, null, 'User not exists', HttpStatus.BAD_REQUEST)
    }
    const response = plainToClass(SerializeUser, user)
    return FormatResponse<UserEntity>(true, response, 'User get successfully', HttpStatus.OK)
  }

  async create(userDto: CreateUserDto): Promise<FormatedResponse<UserEntity>> {
    const response = await this.userRepo.save({ ...userDto, createdAt: new Date() })
    return FormatResponse<UserEntity>(true, response, 'User added successfully', HttpStatus.CREATED)
  }

  async update(id: number, updateDto: UpdateUserDto): Promise<FormatedResponse<UserEntity>> {
    const isUpdated = await this.userRepo.update(id, updateDto);
    if (isUpdated?.affected > 0) {
      const updatedUsre = await this.userRepo.findOne(id);
      const response = plainToClass(SerializeUser, updatedUsre)
      return FormatResponse<UserEntity>(true, response, 'User updated successfully', HttpStatus.OK)
    } else {
      return FormatResponse<UserEntity>(false, null, 'User not exists', HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: number): Promise<FormatedResponse<boolean>> {
    const isDeleted = await this.userRepo.delete(id);
    if (isDeleted?.affected > 0) {
      return FormatResponse<boolean>(true, null, 'User deleted successfully', HttpStatus.OK)
    } else {
      return FormatResponse<boolean>(false, null, 'User not exists', HttpStatus.BAD_REQUEST)
    }
  }
}
