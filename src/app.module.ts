import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configRoot } from './core/config/configurations';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/database/database.module';
import { OrdersModule } from './orders/orders.module';
import { WcController } from './wc/wc.controller';
import { WcService } from './wc/services/wc.service';
import { WompiService } from './wc/services/wompi.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TransationStatusCronjobService } from './wc/cronjob/transation-status.service';
import { TransationsService } from './wc/repositories/transactions.repository';
@Module({
  imports: [ConfigModule.forRoot(configRoot()), PrismaModule, AuthModule, OrdersModule, ScheduleModule.forRoot()],
  controllers: [WcController],
  providers: [WcService, TransationsService, WompiService, TransationStatusCronjobService],
=======
import { ScheduleModule } from '@nestjs/schedule';
import { BirthdayController } from './birthday/birthday.controller';
import { BirthdayService } from './birthday/services/birthday.service';
import { BirthdayRepository } from './birthday/repositories/birthday.repository';
import { DatabaseModule } from './core/database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Birthday, BirthdaySchema } from './birthday/schemas/birthday.shema';
import { BirthdayStatusCronjobService } from './birthday/cronjob/birthday-status.service';

@Module({
  imports: [
    ConfigModule.forRoot(configRoot()),
    ScheduleModule.forRoot(),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: Birthday.name,
        schema: BirthdaySchema,
      },
    ]),
  ],
  controllers: [BirthdayController],
  providers: [BirthdayService, BirthdayRepository, BirthdayStatusCronjobService],
>>>>>>> bdfb14d2941aa55c6d29de6bf886eaccfd226986
})
export class AppModule {}
