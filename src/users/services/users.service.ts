import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { SerializeUser } from '../types/User';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async allUsers() {
    const allUsers = await this.userRepo.find();
    return {
      success: true,
      data: allUsers.map((user) => new SerializeUser(user)),
      msg: 'Users',
    };
  }

  async findUserById(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      return { success: false, data: {}, msg: 'User not exists!' };
    }
    return {
      success: true,
      data: plainToClass(SerializeUser, user),
      msg: 'User',
    };
  }

  async create(userDto: CreateUserDto) {
    return {
      success: true,
      data: await this.userRepo.save({ ...userDto, createdAt: new Date() }),
      msg: 'User added successfully!',
    };
  }

  async update(id: number, updateDto: UpdateUserDto) {
    const isUpdated = await this.userRepo.update(id, updateDto);
    if (isUpdated?.affected > 0) {
      const updatedUsre = await this.userRepo.findOne(id);
      return {
        success: true,
        data: plainToClass(SerializeUser, updatedUsre),
        msg: 'User updated successfully!',
      };
    } else {
      return { success: false, data: {}, msg: 'User not exists!' };
    }
  }

  async delete(id: number) {
    const isDeleted = await this.userRepo.delete(id);
    if (isDeleted?.affected > 0) {
      return {
        success: true,
        data: {},
        msg: 'User deleted successfully!',
      };
    } else {
      return { success: false, data: {}, msg: 'User not exists!' };
    }
  }
}
