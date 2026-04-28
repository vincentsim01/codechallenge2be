import { ThreadService } from '../thread/thread.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateThreadDto } from './dto/create-thread.dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto/update-thread.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';

@Controller('thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get()
  getAllThreads() {
    return this.threadService.getAllThreads();
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Get(':id')
  getThread(@Param('id') id: string) {
    return this.threadService.getThreadById(Number(id));
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Patch(':id')
  updateThread(@Param('id') id: string, @Body() data: UpdateThreadDto) {
    return this.threadService.update(Number(id), data);
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteThread(@Param('id') id: string) {
    return this.threadService.delete(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createThread(@Body() dto: CreateThreadDto) {
    return this.threadService.createThread(dto); // temporary userId
  }
}
