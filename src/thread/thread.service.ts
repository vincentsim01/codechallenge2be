// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';

@Injectable()
export class ThreadService {
  constructor(private readonly threadRepo: ThreadRepository, private readonly prisma: PrismaService){}

  async getAllThreads() {
    return this.threadRepo.findAllThreads();
  }

  async getThreadById(id: string) {
    const thread = await this.threadRepo.findThreadById(id);
    // if (!thread) throw new NotFoundException('thread not found');
    return thread;
  }

  async findAllThreadsByUserId(userId: string) {
    return this.threadRepo.findAllThreadsByUserId(userId);
  }

  async update(id: string, data: UpdateThreadDto) {
    return this.threadRepo.updateThread(id, data);
  }

  async findAllThreadsByEmail(email: string) {
    if (!email.includes('@')) {
      throw new BadRequestException('Invalid email format');
    }
    return this.threadRepo.findAllThreadsByEmail(email);
  }

  async delete(id: string) {
    return this.threadRepo.deleteThread(id);
  }

  async createThread(data: CreateThreadDto) {
    return this.threadRepo.createThread(data);
  }
}
