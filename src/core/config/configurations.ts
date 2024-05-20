import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  databaseUrl: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  encryptionPassword: string;
  encryptionIv: string;
  shopUrl: string;
  apiKeyWc: string;
  privateKeyWompi: string;
  wompiUrl: string;
  wompiLink: string;
  luloChatUrl: string;
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.TOKEN_EXPIRATION,
    encryptionPassword: process.env.ENCRYPTION_PASSWORD,
    encryptionIv: process.env.ENCRYPTION_IV,
    shopUrl: process.env.SHOP_URL,
    apiKeyWc: process.env.API_KEY_WC,
    privateKeyWompi: process.env.PRIVATE_KEY_WOMPI,
    wompiUrl: process.env.WOMPI_URL,
    wompiLink: process.env.WOMPI_LINK_PAYMENT,
    luloChatUrl: process.env.LULO_CHAT_URL,
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
      SHOP_URL: Joi.string().required(),
      API_KEY_WC: Joi.string().required(),
      PRIVATE_KEY_WOMPI: Joi.string().required(),
      WOMPI_URL: Joi.string().required(),
      WOMPI_LINK_PAYMENT: Joi.string().required(),
      LULO_CHAT_URL: Joi.string().required(),
    }),
  };
}
