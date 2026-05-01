import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import {AuthController} from '../auth/auth.controller';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const count = await this.prisma.user.count();
    const displayId = `U${(count + 1).toString().padStart(3, '0')}`;

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        displayId,
        role: 'USER',
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      //   include: { todos: true },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      //   include: { todos: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
