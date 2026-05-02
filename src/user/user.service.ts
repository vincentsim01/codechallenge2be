import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository, private readonly prisma: PrismaService) {}

  getAllUsers() {
    return this.userRepo.findAll();
  }

  async getUserById(id: string) {
    const user = await this.userRepo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }
    const client = await this.userRepo.findByEmail(email);
    if (!client) throw new NotFoundException('client not found');
    return client;
  }

  update(id: string, data: UpdateUserDto) {
    return this.userRepo.update(id, data);
  }

  delete(id: string) {
    return this.userRepo.delete(id);
  }

  createUser(data: CreateUserDto) {
    return this.userRepo.createUser(data);
  }
}
