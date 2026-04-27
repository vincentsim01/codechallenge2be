import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // from JwtAuthGuard
    const params = request.params; // e.g., { id: '3', userId: '5' }

    if (!user) return false; // user not authenticated

    // If user is admin, allow access
    if (user.role === 'ADMIN') {
      return true;
    }

    // Check if the user is accessing their own resource
    // Works for routes like /user/:id or /transactions/user/:userId
    const resourceUserId = params.userId || params.id;
    
    if (resourceUserId && user.userId === Number(resourceUserId)) {
      return true;
    }

    // If not owner and not admin, deny access
    throw new ForbiddenException('You do not have permission to access this resource');
  }
}