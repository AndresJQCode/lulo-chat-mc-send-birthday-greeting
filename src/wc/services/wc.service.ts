import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { PaymentData } from '../dto/payment-data.dto';
import { WcPaymentDataAdapter } from '../adapters/wc-payment-data.adapter';
import { TransactionToWc } from '../adapters/transaction-to-wc.adapter';
import { ResponseOrders, ResponseTransactionWompi } from '../interfaces/response.interface';
import configurations from 'src/core/config/configurations';
import { ConfigType } from '@nestjs/config';
import { transformProduct, transformProducts } from '../adapters/wc-products-to-products.adapter';
import { TransformedProduct } from '../interfaces/products.interface';

@Injectable()
export class WcService {
  constructor(@Inject(configurations.KEY) private readonly _configService: ConfigType<typeof configurations>) {}
  private endpoint = this._configService.shopUrl;
  private api_key = this._configService.apiKeyWc;

  async createOrder(PaymentData: PaymentData): Promise<ResponseOrders> {
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

  async getAllOrders(): Promise<ResponseOrders> {
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

  async getProducts(): Promise<TransformedProduct[]> {
    try {
      const url = `${this.endpoint}/products?per_page=100`;
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Basic ${this.api_key}`,
        },
      });
      const wooCommerceProductcs = response.data;
      return transformProducts(wooCommerceProductcs);
    } catch (error) {
      throw new Error(`Error while fetching products: ${error.message}`);
    }
  }

  async getProductsById(idProdut: number): Promise<TransformedProduct> {
    try {
      const url = `${this.endpoint}/products/${idProdut}`;
      const response: AxiosResponse = await axios.get(url, {
        headers: {
          Authorization: `Basic ${this.api_key}`,
        },
      });
      const wooCommerceProductc = response.data;
      return transformProduct(wooCommerceProductc);
    } catch (error) {
      throw new Error(`Error while fetching products: ${error.message}`);
    }
  }

  async updateOrder(transaction: ResponseTransactionWompi, paymentId) {
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
