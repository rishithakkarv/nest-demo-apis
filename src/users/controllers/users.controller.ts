import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUsers() {
    return this.usersService.allUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const userDetails = this.usersService.findUserById(id);
    if (userDetails.success) {
      res.status(200).send(userDetails);
    } else {
      res.status(400).send(userDetails);
    }
  }

  @Post('/add')
  @UsePipes(ValidationPipe)
  addNew(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const allUsers = this.usersService.add(createUserDto);
    if (allUsers.success) {
      res.send(allUsers);
    } else {
      res.status(400).send(allUsers);
    }
  }

  @Patch('/update/:id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUserData = this.usersService.update(id, updateDto);
    if (updatedUserData.success) {
      res.send(updatedUserData);
    } else {
      res.status(400).send(updatedUserData);
    }
  }

  @Delete('/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const allUsers = this.usersService.delete(id);
    if (allUsers.success) {
      res.send(allUsers);
    } else {
      res.status(400).send(allUsers);
    }
  }
}
