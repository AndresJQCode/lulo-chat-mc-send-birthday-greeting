import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configRoot } from './core/config/configurations';
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
})
export class AppModule {}
