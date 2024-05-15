import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import configurations from 'src/core/config/configurations';
import { UserPayloadJwt } from '../models';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(configurations.KEY) private readonly _configService: ConfigType<typeof configurations>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.jwtSecret,
    });
  }

  validate(payload: any): UserPayloadJwt {
    const { sub, role } = payload;
    return { id: sub, role };
  }
}
