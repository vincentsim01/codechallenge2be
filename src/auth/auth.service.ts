import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user; // result contains roles
      return result;
    }
    return null;
  }

  async login(user: {
    email: string;
    userId: number | string;
    roles: string | null;
  }) {
    const payload = {
      email: user.email,
      sub: user.userId,
      role: user.roles,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '2h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRt = await bcrypt.hash(refresh_token, 10);

    const existing = await this.usersService.findByEmail(user.email);
    if (!existing) return null;

    await this.usersService.update(existing.id, { refreshToken: hashedRt });

    return {
      access_token,
      refresh_token,
    };
  }

  async userLogin(email: string, password: string) {
    const payload = await this.validateUser(email, password);
    if (!payload) return null;

    return this.login({
      email,
      userId: payload.id,
      roles: payload.role ?? null,
    });
  }

  async refreshTokens(userId: string, token: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user || !user.refreshToken) throw new ForbiddenException('No no no!');

    const rTmatches = await bcrypt.compare(token, user.refreshToken);
    if (!rTmatches) throw new ForbiddenException('No refresh refresh club');

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role ?? null,
    };

    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    const hashedRt = await bcrypt.hash(newRefreshToken, 10);

    await this.usersService.update(user.id, { refreshToken: hashedRt });

    return {
      access_token: newAccessToken,
      refresh_token: newRefreshToken,
    };
  }
}
