import { Injectable } from '@nestjs/common';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(    
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,) {
    console.log('JwtAuthGuard handleRequest: ', { err, user, info });
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user; // must return the user for Nest to attach to req.user
  }
}