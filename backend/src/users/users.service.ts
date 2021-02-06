import { Injectable } from '@nestjs/common';
import { LoginForgotUserDto } from './dto/login-user.dto';
import { EntireUser, LeastUser, User } from './interfaces/user.interface';
import * as uuid from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
config();

@Injectable()
export class UsersService {
  private readonly users: EntireUser[] = [];

  create(createUserDto: CreateUserDto): User {
    const { username, email, password } = createUserDto;
    if (!username)
      throw new HttpException('Please Provide username', HttpStatus.NOT_FOUND);
    if (!email)
      throw new HttpException('Please Provide email', HttpStatus.NOT_FOUND);
    if (!password)
      throw new HttpException('Please Provide password', HttpStatus.NOT_FOUND);
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    const token = jwt.sign({ username }, process.env.SECRET, {
      expiresIn: '1h',
    });
    const user: EntireUser = {
      id: uuid.v4(),
      username,
      password: hash,
      email,
      token,
    };
    this.users.push(user);
    return { username, email, id: user.id, token: user.token };
  }

  findAll(): LeastUser[] {
    const users = this.users.map((user) => {
      return {
        username: user.username,
        email: user.email,
        id: user.id,
      };
    });
    return users;
  }

  findOne(id: string): LeastUser {
    const user: User = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return { username: user.username, email: user.email, id: user.id };
  }

  forgotPassword({ email, password }: LoginForgotUserDto): string {
    if (!email)
      throw new HttpException('Email is required', HttpStatus.NOT_FOUND);
    if (!password)
      throw new HttpException('Password is required', HttpStatus.NOT_FOUND);
    const index = this.users.findIndex((user) => user.email === email);
    if (index === -1) {
      throw new HttpException('Invalid email', HttpStatus.NOT_ACCEPTABLE);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    this.users[index].password = hash;
    return 'Password Changed';
  }

  remove(id: string): string {
    const user: User = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    this.users.filter((user) => user.id !== id);
    return 'User Removed';
  }

  login({ email, password }: LoginForgotUserDto): User {
    const user = this.users.find((user) => user.email === email);
    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.NOT_ACCEPTABLE);
    }
    const isvalid = bcrypt.compareSync(password, user.password);
    if (isvalid) {
      return {
        id: user.id,
        email: user.email,
        token: user.token,
        username: user.username,
      };
    }
    throw new HttpException('Invalid password', HttpStatus.NOT_ACCEPTABLE);
  }
}
