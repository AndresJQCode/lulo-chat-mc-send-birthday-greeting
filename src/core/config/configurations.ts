import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  encryptionPassword: string;
  encryptionIv: string;
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.TOKEN_EXPIRATION,
    encryptionPassword: process.env.ENCRYPTION_PASSWORD,
    encryptionIv: process.env.ENCRYPTION_IV,
  })
);

export default configurations;

export function configRoot(): ConfigModuleOptions {
  return {
    load: [configurations],
    isGlobal: true,
    validationSchema: Joi.object({
      DATABASE_URL: Joi.string().required(),
      JWT_SECRET: Joi.string().required(),
      TOKEN_EXPIRATION: Joi.string().required(),
      ENCRYPTION_PASSWORD: Joi.string().required(),
      ENCRYPTION_IV: Joi.string().required(),
    }),
  };
}
