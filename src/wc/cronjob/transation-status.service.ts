import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OrderStatus } from '../enums/transactions.enums';
import { WompiService } from './../services/wompi.service';
import { WcService } from '../services/wc.service';
import axios, { AxiosResponse } from 'axios';
import configurations from 'src/core/config/configurations';
import { ConfigType } from '@nestjs/config';
import { TransationsService } from '../repositories/transactions.repository';

@Injectable()
export class TransationStatusCronjobService {
  constructor(
    private readonly transationsService: TransationsService,
    private readonly wompiService: WompiService,
    private readonly wcService: WcService,
    @Inject(configurations.KEY) private readonly _configService: ConfigType<typeof configurations>
  ) {}
  private readonly logger = new Logger(TransationStatusCronjobService.name);
  private endpoint = this._configService.luloChatUrl;

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    const transactions = await this.transationsService.getTransactionsByStatus(OrderStatus.PENDING);
    for (const transaction of transactions) {
      const transactionWompi = await this.wompiService.getStatusByTransaction(transaction);
      if (transactionWompi.length > 0 && transactionWompi[0].status != OrderStatus.PROCESSING) {
        await this.wcService.updateOrder(transactionWompi[0], transaction.paymentId);
        await this.transationsService.updateStatusTransaction(transaction.id, OrderStatus.PROCESSING);
        await this.notify(transaction.paymentId, transactionWompi[0].status, transactionWompi[0].id);
      }
    }
    this.logger.debug(transactions);
  }

  async notify(idPayment, status, idTransaccion) {
    const url = `${this.endpoint}/payments-tracking`;
    try {
      const response: AxiosResponse = await axios.post(`${url}`, {
        idPayment,
        status,
        idTransaccion,
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching generateLinkPayment: ${error.message}`);
    }
  }
}
