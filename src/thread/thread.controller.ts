import { ThreadService } from '../thread/thread.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Put, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import type { Request } from 'express';
import { Req } from '@nestjs/common';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';
interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Controller('api/threads')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  // @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  // @Roles(Role.ADMIN)
  @Get()
  getAllThreads() {
    return this.threadService.getAllThreads();
  }

  // @Req() req: AuthRequest
  @UseGuards(JwtAuthGuard)
  @Get('mythreads')
  getAllThreadsByUserId(@Req() req: AuthRequest) {
    const userId = req.user.userId;
    return this.threadService.findAllThreadsByUserId(userId);
  }

  // @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get(':id')
  getThread(@Param('id') id: string) {
    return this.threadService.getThreadById(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Put(':id')
  updateThread(@Param('id') id: string, @Body() data: UpdateThreadDto) {
    return this.threadService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  deleteThread(@Param('id') id: string) {
    return this.threadService.delete(id);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Post()
  createThread(@Body() dto: CreateThreadDto) {
    return this.threadService.createThread(dto); // temporary userId
  }
}
