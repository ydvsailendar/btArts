import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginForgotUserDto } from './dto/login-user.dto';
import { LeastUser, User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): LeastUser[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): LeastUser {
    return this.usersService.findOne(id);
  }

  @Put()
  forgotPassword(@Body() loginForgotUserDto: LoginForgotUserDto): string {
    return this.usersService.forgotPassword(loginForgotUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return this.usersService.remove(id);
  }

  @Post('/login')
  login(@Body() loginForgotUserDto: LoginForgotUserDto): User {
    return this.usersService.login(loginForgotUserDto);
  }
}
