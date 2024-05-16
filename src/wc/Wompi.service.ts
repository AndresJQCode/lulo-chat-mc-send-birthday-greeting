import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { WompiDataAdapter } from './adapters/WompiDataAdapter';

@Injectable()
export class WompiService {
  constructor() {}
  private endpoint = process.env.WOMPI_URL;
  private privateKey = process.env.PRIVATE_KEY_WOMPI;
  private urlPaymentBase = process.env.WOMPI_LINK_PAYMENT;

  async generateLinkPayment(paymentInfo) {
    const url = `${this.endpoint}/payment_links`;
    const dataWompi = WompiDataAdapter(paymentInfo);
    console.log('dataWompi', dataWompi);
    try {
      const response: AxiosResponse = await axios.post(`${url}`, dataWompi, {
        headers: {
          Authorization: `Bearer ${this.privateKey}`,
        },
      });
      const { id } = response.data.data;
      const urlPayment = `${this.urlPaymentBase}/${id}`;
      return urlPayment;
    } catch (error) {
      throw new Error(`Error while fetching generateLinkPayment: ${error.message}`);
    }
  }
}
