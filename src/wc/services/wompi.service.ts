import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { WompiDataAdapter } from '../adapters/wompi-data.adapter';
import { Transaction } from '@prisma/client';

@Injectable()
export class WompiService {
  constructor() {}
  private endpoint = process.env.WOMPI_URL;
  private privateKey = process.env.PRIVATE_KEY_WOMPI;
  private urlPaymentBase = process.env.WOMPI_LINK_PAYMENT;

  async generateLinkPayment(paymentInfo) {
    const url = `${this.endpoint}/payment_links`;
    const dataWompi = WompiDataAdapter(paymentInfo);
    console.log(`dataWompi`, dataWompi);
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

  async getStatusByTransaction(transaction: Transaction) {
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
      console.log(url, response.data);
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching generateLinkPayment: ${error.message}`);
    }
  }
}
