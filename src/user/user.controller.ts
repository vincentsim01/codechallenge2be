import { UserService } from './user.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Roles } from '../auth/guards/roles.guard';
import { Role } from 'src/auth/decorators/roles.decorator';
import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('api')
// @UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get('allusers')
  getAllClients() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Get('users/:id')
  getClient(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.getUserById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  // @Roles(Role.ADMIN)
  @Patch('users/:id')
  updateClient(@Param('id', new ParseUUIDPipe()) id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
  @Roles(Role.ADMIN)
  @Delete('users/:id')
  deleteClient(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }

  @Get('email/:email')
  getClientByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post('auth/register')
  createUser(
    @Body()
    data: CreateUserDto,
  ) {
    return this.userService.createUser(data);
  }
}
