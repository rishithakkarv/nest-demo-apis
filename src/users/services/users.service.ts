import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { SerializeUser, User } from '../types/User';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Rishi',
      email: 'rishi@test.com',
      createdAt: new Date(),
      password: '123#123',
    },
    {
      id: 2,
      name: 'Khushi',
      email: 'khushi@test.com',
      createdAt: new Date(),
      password: '123#123',
    },
  ];

  allUsers() {
    return {
      success: true,
      data: this.users.map((user) => new SerializeUser(user)),
      msg: 'Users',
    };
  }

  findUserById(id: number) {
    const isExists = this.users.find((user) => user.id === id);
    if (!isExists) {
      return { success: false, data: {}, msg: 'User not exists!' };
    }
    return {
      success: true,
      data: plainToClass(
        SerializeUser,
        this.users.find((user) => user.id === id),
      ),
      msg: 'User',
    };
  }

  add(userDto: CreateUserDto) {
    const isExists = this.users.find((user) => user.email === userDto.email);
    if (isExists) {
      return { success: false, data: {}, msg: 'User already exists!' };
    } else {
      const ids: number[] = this.users.map((user) => user.id);
      const nextId = Math.max(...ids) + 1;
      userDto.id = nextId;
      userDto.createdAt = new Date();
      this.users.push(userDto);

      return {
        success: true,
        data: this.users.map((user) => plainToClass(SerializeUser, user)),
        msg: 'User added successfully!',
      };
    }
  }

  update(id: number, updateDto: UpdateUserDto) {
    if (id && updateDto) {
      const isExists = this.users.find((user) => user.id === id);
      if (isExists) {
        // Update user
        this.users.map((user) => {
          if (user.id === id) {
            user.name = updateDto.name;
          }
        });
        return {
          success: true,
          data: plainToClass(
            SerializeUser,
            this.users.find((user) => user.id === id),
          ),
          msg: 'User updated successfully!',
        };
      } else {
        return { success: false, data: {}, msg: 'User not exists!' };
      }
    } else {
      return { success: false, data: {}, msg: 'Invalid data!' };
    }
  }

  delete(id: number) {
    if (id) {
      const isExists = this.users.find((user) => user.id === id);
      if (!isExists) {
        return { success: false, data: {}, msg: 'User not exists!' };
      }

      this.users = this.users.filter((user) => user.id != id);
      return {
        success: true,
        data: {},
        msg: 'User deleted successfully!',
      };
    } else {
      return { success: false, data: {}, msg: 'Invalid data!' };
    }
  }
}
