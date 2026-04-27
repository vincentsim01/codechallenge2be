import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ThreadController } from './thread/thread.controller';
import { ThreadService } from './thread/thread.service';
import { ThreadModule } from './thread/thread.module';

@Module({
  imports: [UserModule, ThreadModule],
  controllers: [AppController, UserController, ThreadController],
  providers: [AppService, UserService, ThreadService],
})
export class AppModule {}
