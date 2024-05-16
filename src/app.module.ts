import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configRoot } from './core/config/configurations';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/database/database.module';
import { OrdersModule } from './orders/orders.module';
import { WcController } from './wc/wc.controller';
import { WcService } from './wc/wc.service';
import { WompiService } from './wc/Wompi.service';

@Module({
  imports: [ConfigModule.forRoot(configRoot()), PrismaModule, AuthModule, OrdersModule],
  controllers: [WcController],
  providers: [WcService, WompiService],
})
export class AppModule {}
