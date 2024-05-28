import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  databaseUrl: string;
<<<<<<< HEAD
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
=======
  apiKey: string;
  urlLuloChatBackend: string;
>>>>>>> bdfb14d2941aa55c6d29de6bf886eaccfd226986
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    databaseUrl: process.env.DATABASE_URL,
<<<<<<< HEAD
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
=======
    apiKey: process.env.API_KEY_LULO_CHAT_BACKEND,
    urlLuloChatBackend: process.env.URL_LULO_CHAT_BACKEND,
>>>>>>> bdfb14d2941aa55c6d29de6bf886eaccfd226986
  })
);

export default configurations;

export function configRoot(): ConfigModuleOptions {
  return {
    load: [configurations],
    isGlobal: true,
    validationSchema: Joi.object({
      DATABASE_URL: Joi.string().required(),
<<<<<<< HEAD
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
=======
      API_KEY_LULO_CHAT_BACKEND: Joi.string().required(),
      URL_LULO_CHAT_BACKEND: Joi.string().required(),
>>>>>>> bdfb14d2941aa55c6d29de6bf886eaccfd226986
    }),
  };
}
