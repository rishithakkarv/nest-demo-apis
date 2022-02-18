import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class UsersService {
  users = [
    {
      id: 1,
      name: 'Rishi',
      email: 'rishi@test.com',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Khushi',
      email: 'khushi@test.com',
      createdAt: new Date(),
    },
  ];

  allUsers() {
    return { success: true, data: this.users, msg: 'Users' };
  }

  findUserById(id: number) {
    const isExists = this.users.find((user) => user.id === id);
    if (!isExists) {
      return { success: false, data: {}, msg: 'User not exists!' };
    }
    return {
      success: true,
      data: this.users.find((user) => user.id === id),
      msg: 'User',
    };
  }

  add(data: User) {
    const isExists = this.users.find((user) => user.email === data.email);
    if (!isExists) {
      const ids: number[] = this.users.map((user) => user.id);
      const nextId = Math.max(...ids) + 1;
      data.id = nextId;
      data.createdAt = new Date();
      this.users.push(data);
      return {
        success: true,
        data: this.users,
        msg: 'User added successfully!',
      };
    } else {
      return { success: false, data: {}, msg: 'User already exists!' };
    }
  }

  update(id: number, data: User) {
    if (id && data) {
      const isExists = this.users.find((user) => user.id === id);
      if (isExists) {
        // Update user
        this.users.map((user) => {
          if (user.id === id) {
            user.name = data.name;
          }
        });
        return {
          success: true,
          data: this.users.find((user) => user.id === id),
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
