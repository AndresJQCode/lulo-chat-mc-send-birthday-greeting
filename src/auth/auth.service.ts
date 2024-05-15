import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/database.service';
import { comparePassword } from 'src/utilities/hash-password.utils';
import { UserSession } from './interfaces/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService
  ) {}

  async login(user: UserSession) {
    const payload = { role: user.role, sub: user.id };

    return {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email: { mode: 'insensitive', equals: email } },
      include: { role: true },
    });

    if (!user) {
      return null;
    }

    if (user.disabledAt) {
      return null;
    }

    if (!(await comparePassword(password, user.password))) {
      return null;
    }

    const userToResponse: UserSession = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.name,
      disabledAt: user.disabledAt,
    };
    return userToResponse;
  }
}
