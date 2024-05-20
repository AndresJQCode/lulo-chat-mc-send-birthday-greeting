import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { WompiDataAdapter } from '../adapters/wompi-data.adapter';
import { Transaction } from '@prisma/client';
import { ResponseTransactionWompi } from '../interfaces/response.interface';
import configurations from 'src/core/config/configurations';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class WompiService {
  constructor(@Inject(configurations.KEY) private readonly _configService: ConfigType<typeof configurations>) {}
  private endpoint = this._configService.wompiUrl;
  private privateKey = this._configService.privateKeyWompi;
  private urlPaymentBase = this._configService.wompiLink;

  async generateLinkPayment(paymentInfo) {
    const url = `${this.endpoint}/payment_links`;
    const dataWompi = WompiDataAdapter(paymentInfo);
    try {
      const response: AxiosResponse = await axios.post(`${url}`, dataWompi, {
        headers: {
          Authorization: `Bearer ${this.privateKey}`,
        },
      });
      const { id } = response.data.data;
      const urlPayment = `${this.urlPaymentBase}/${id}`;
      return [urlPayment, id];
    } catch (error) {
      throw new Error(`Error while fetching generateLinkPayment: ${error.message}`);
    }
  }

  async getStatusByTransaction(transaction: Transaction): Promise<ResponseTransactionWompi[]> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().slice(0, 10);
    const today = new Date();
    const formattedToday = today.toISOString().slice(0, 10);
    const url = `${this.endpoint}/transactions?from_date=${formattedYesterday}&until_date=${formattedToday}&page=1&page_size=10&reference=${transaction.paymentLink}`;

    try {
      const response: AxiosResponse = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer ${this.privateKey}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error(`Error while fetching generateLinkPayment: ${error.message}`);
    }
  }
}
