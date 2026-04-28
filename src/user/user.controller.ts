import { UserService } from './user.service';
import { Controller , Get, Param, Post, Body, UseGuards, Patch, Delete} from '@nestjs/common';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { OwnershipGuard } from 'src/auth/guards/ownership.guard';
// import { Roles } from '../auth/guards/roles.guard';
// import { Role } from 'src/auth/decorators/roles.decorator';


@Controller('user')
// @UseGuards(JwtAuthGuard)

export class UserController {
    constructor(private readonly userService:UserService){}

    // @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    // @Roles(Role.ADMIN)
    @Get()
    getAllClients(){
        return this.userService.getAllUsers();
    }

    // @UseGuards(JwtAuthGuard, OwnershipGuard)
    // @Roles(Role.ADMIN)
    @Get('id/:id')
    getClient(@Param('id') id:string){
        return this.userService.getUserById(Number(id));
    }

    // @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    // @Roles(Role.ADMIN)

    // @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    // @Roles(Role.ADMIN)
    @Patch(':id')
    updateClient(@Param('id') id:string, @Body() data: UpdateUserDto){
        return this.userService.update(Number(id), data);
    }
    // @UseGuards(JwtAuthGuard, RolesGuard, OwnershipGuard)
    // @Roles(Role.ADMIN)
    @Delete(':id')
    deleteClient(@Param('id') id:string){
        return this.userService.delete(Number(id));
    }

     @Get('email/:email')
    getClientByEmail(@Param('email') email:string){
        return this.userService.findByEmail(email);
    }

    @Post('signup')
    createUser(
        @Body() body:{
            // id:number,
            name:string,
            email:string,
            password:string,
            role: 'ADMIN' | 'USER',
        },
    ){
        return this.userService.createUser(body);
    }

}