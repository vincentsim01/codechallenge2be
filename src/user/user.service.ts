import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto/update-user.dto';
@Injectable()
export class UserService {
   constructor(private readonly userRepo: UserRepository, private readonly prisma: PrismaService){}

    getAllUsers(){
        return this.userRepo.findAll();
    }

    getUserById(id:number){
        const user =  this.userRepo.findOne(id);
        if(!user) throw new NotFoundException('User not found');
        return user;
    }

    findByEmail(email:string){
        const client =  this.userRepo.findByEmail(email);
        if(!client) throw new NotFoundException('client not found');
        return client;
    }


    update(id: number, data: UpdateUserDto) {
    return this.userRepo.update(id, data);
    //   where: { id },
    //   data,
    };

    delete(id: number) {
    return this.userRepo.delete(id);
    //   where: { id },
    //   data,
    };
  

    createUser(
        data:{
            // id:number,
            name: string,
            email: string,
            password: string,
            role: 'ADMIN' | 'USER',

        }
    ){
        return this.userRepo.createUser(data);
    }
}
