import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configRoot } from './core/config/configurations';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/database/database.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ConfigModule.forRoot(configRoot()), PrismaModule, AuthModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
