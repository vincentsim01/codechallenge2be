import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ThreadController } from './thread/thread.controller';
import { ThreadService } from './thread/thread.service';
import { ThreadModule } from './thread/thread.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [UserModule, ThreadModule, AuthModule, PrismaModule],
  controllers: [AppController, UserController, ThreadController, AuthController],
  providers: [AppService, UserService, ThreadService, AuthService, PrismaService],
})
export class AppModule {}
