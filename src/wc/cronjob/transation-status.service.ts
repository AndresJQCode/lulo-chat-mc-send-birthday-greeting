import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransationsService } from '../repositories/Transactions.repository';
import { TransacionStatus } from '../enums/transactions.enums';

@Injectable()
export class TransationStatusCronjobService {
  constructor(private readonly transationsService: TransationsService) {}
  private readonly logger = new Logger(TransationStatusCronjobService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const transactions = await this.transationsService.getTransactionsByStatus(TransacionStatus.PROCESSING);
    this.logger.debug(transactions);
  }
}
