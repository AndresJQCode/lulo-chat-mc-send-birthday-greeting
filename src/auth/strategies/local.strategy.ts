import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { UserSession } from '../interfaces/auth.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserSession> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Email y/o contraseña no validos');
    }

    if (user.disabledAt) {
      throw new UnauthorizedException('Usuario no autorizado');
    }

    return user;
  }
}
