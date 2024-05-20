import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configRoot } from './core/config/configurations';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/database/database.module';
import { OrdersModule } from './orders/orders.module';
import { WcController } from './wc/wc.controller';
import { WcService } from './wc/services/wc.service';
import { WompiService } from './wc/services/wompi.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TransationStatusCronjobService } from './wc/cronjob/transation-status.service';
import { TransationsService } from './wc/repositories/Transactions.repository';
@Module({
  imports: [ConfigModule.forRoot(configRoot()), PrismaModule, AuthModule, OrdersModule, ScheduleModule.forRoot()],
  controllers: [WcController],
  providers: [WcService, TransationsService, WompiService, TransationStatusCronjobService],
})
export class AppModule {}
