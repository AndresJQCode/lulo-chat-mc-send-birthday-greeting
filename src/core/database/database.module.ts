import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import configurations, { configRoot } from 'src/core/config/configurations';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot(configRoot())],
      inject: [configurations.KEY],
      useFactory: async (configEnvs: ConfigType<typeof configurations>) => {
        return {
          uri: configEnvs.databaseUrl,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
