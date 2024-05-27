import { ConfigModuleOptions, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface IConfig {
  databaseUrl: string;
  apiKey: string;
  urlLuloChatBackend: string;
}

const configurations = registerAs(
  'configEnvs',
  (): IConfig => ({
    databaseUrl: process.env.DATABASE_URL,
    apiKey: process.env.API_KEY_LULO_CHAT_BACKEND,
    urlLuloChatBackend: process.env.URL_LULO_CHAT_BACKEND,
  })
);

export default configurations;

export function configRoot(): ConfigModuleOptions {
  return {
    load: [configurations],
    isGlobal: true,
    validationSchema: Joi.object({
      DATABASE_URL: Joi.string().required(),
      API_KEY_LULO_CHAT_BACKEND: Joi.string().required(),
      URL_LULO_CHAT_BACKEND: Joi.string().required(),
    }),
  };
}
