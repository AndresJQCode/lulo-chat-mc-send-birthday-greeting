import * as mongoose from 'mongoose';
import configurations from '../config/configurations';
import { ConfigType } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [configurations.KEY],
    useFactory: async (configEnvs: ConfigType<typeof configurations>): Promise<typeof mongoose> =>
      await mongoose.connect(configEnvs.databaseUrl),
  },
];
