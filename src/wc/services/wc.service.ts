import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PaymentData } from '../dto/payment-data.dto';
import { WcPaymentDataAdapter } from '../adapters/wc-payment-data.adapter';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionToWc } from '../adapters/transaction-to-wc.adapter';

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

  async updateOrder(transaction: Transaction, paymentId) {
    const updatedOrder = TransactionToWc(transaction);
    try {
      const response: AxiosResponse = await axios.put(`${this.endpoint}/orders/${paymentId}`, updatedOrder, {
        headers: {
          Authorization: `Basic ${this.api_key}`,
        },
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error updating order. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Error while updating orders: ${error.message}`);
    }
  }
}
