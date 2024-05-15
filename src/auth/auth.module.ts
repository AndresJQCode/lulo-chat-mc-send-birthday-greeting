import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';
import configurations, { configRoot } from 'src/core/config/configurations';
import { JwtStrategy, LocalStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(configRoot())],
      inject: [configurations.KEY],
      useFactory(configEnvs: ConfigType<typeof configurations>) {
        return { secret: configEnvs.jwtSecret, signOptions: { expiresIn: configEnvs.jwtExpiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
