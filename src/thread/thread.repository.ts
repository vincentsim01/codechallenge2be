import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';

@Injectable()
export class ThreadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createThread(data: CreateThreadDto) {
    return this.prisma.thread.create({
      data: {
        title: data.title,
        content: data.content,
        userId: data.userId,
      },
    });
  }

  async findAllThreads() {
    return this.prisma.thread.findMany();
  }

  async findAllThreadsByEmail(email: string) {
    return this.prisma.thread.findMany();
  }

  async findThreadById(id: number) {
    const thread = await this.prisma.thread.findUnique({
        where: { id },
    });

    if (!thread) {
        throw new Error('Thread not found');
    }
    return thread;
  }

  async updateThread(id: number, data: UpdateThreadDto) {
    return this.prisma.thread.update({
      where: { id },
        data: {
            title: data.title,
            content: data.content,
        },
  });
  }

  async deleteThread(id: number) {
    return this.prisma.thread.delete({
      where: { id },
    });
  }
}
 