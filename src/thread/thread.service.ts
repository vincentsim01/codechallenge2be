// import { BatchPayload } from './../../node_modules/.prisma/client/index.d';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ThreadRepository } from './thread.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';

@Injectable()
export class ThreadService {

        constructor(private readonly threadRepo: ThreadRepository, private readonly prisma: PrismaService){}

    async getAllThreads(){
        return this.threadRepo.findAllThreads();
    }

    async getThreadById(id:number){
        const thread = await this.threadRepo.findThreadById(id);
        if(!thread) throw new NotFoundException('thread not found');
        return thread;
    }

    async findAllThreadsByEmail(email: string) {
        return this.threadRepo.findAllThreadsByEmail(email);
    }

    async update(id: number, data: UpdateThreadDto) {
    return this.threadRepo.updateThread(id, data);
    };

    async delete(id: number) {
    return this.threadRepo.deleteThread(id);
    };

  async createThread(data: CreateThreadDto) {
    return this.threadRepo.createThread(data);
  }


}
