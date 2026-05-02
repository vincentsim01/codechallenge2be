import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';

@Injectable()
export class ThreadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createThread(data: CreateThreadDto) {
    const count = await this.prisma.thread.count();
    const displayId = `T${(count + 1).toString().padStart(3, '0')}`;
    return this.prisma.thread.create({
      data: {
        ...data,
        displayId,
      },
    });
  }

  async findAllThreads() {
    return this.prisma.thread.findMany();
  }

  async findAllThreadsByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.thread.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async findThreadById(id: string) {
    const thread = await this.prisma.thread.findUnique({
      where: { id },
    });

    // if (!thread) {
    //   throw new NotFoundException('Thread not found');
    // }
    return thread;
  }

  async findAllThreadsByUserId(userId: string) {
    return this.prisma.thread.findMany({
      where:{userId}
    });
  }

  async updateThread(id: string, data: UpdateThreadDto) {
    return this.prisma.thread.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async deleteThread(id: string) {
    return this.prisma.thread.delete({
      where: { id },
    });
  }
}
