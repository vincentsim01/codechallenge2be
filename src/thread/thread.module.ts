import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { ThreadRepository } from './thread.repository';

@Module({
     imports: [PrismaModule],  
      controllers: [ThreadController],
      providers: [ThreadService, ThreadRepository],
      exports: [ThreadService, ThreadRepository]
})
export class ThreadModule {}
