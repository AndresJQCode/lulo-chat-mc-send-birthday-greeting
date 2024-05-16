import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PaymentData } from './dto/PaymentDataDto';
import { WcPaymentDataAdapter } from './adapters/WcPaymentDataAdapter';

@Injectable()
export class WcService {
  constructor() {}
  private endpoint = process.env.SHOP_URL;
  private api_key = process.env.API_KEY_WC;
  async createOrder(PaymentData: PaymentData) {
    const paymentDataToWc = WcPaymentDataAdapter(PaymentData);
    try {
      const response: AxiosResponse = await axios.post(`${this.endpoint}/orders`, paymentDataToWc, {
        headers: {
          Authorization: `Basic ${this.api_key}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error while making orders: ${error.message}`);
    }
  }

  async getAllOrders(): Promise<any> {
    try {
      const url = `${this.endpoint}/orders`;
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Basic ${this.api_key}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error while fetching orders: ${error.message}`);
    }
  }
}
