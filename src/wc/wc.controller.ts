import { Body, Controller, Post, HttpException, HttpStatus, Get } from '@nestjs/common';
import { WcService } from './wc.service';
import { WompiService } from './Wompi.service';
import { PaymentDataDto } from './dto/PaymentDataDto';

@Controller('wc')
export class WcController {
  constructor(
    private readonly wcService: WcService,
    private readonly wompiService: WompiService
  ) {}

  @Get('orders')
  async getAllOrders() {
    try {
      const orders = await this.wcService.getAllOrders();
      return orders;
    } catch (error) {
      throw new HttpException('Error getAllOrders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('generate-payment-link')
  async generatePaymentLink(@Body() paymentData: PaymentDataDto) {
    try {
      const paymentInfo = await this.wcService.createOrder(paymentData);
      const linkPayment = await this.wompiService.generateLinkPayment(paymentInfo);

      const { id, line_items: products, billing, shipping, total, status } = paymentInfo;

      return { id, url: linkPayment, total, status, billing, shipping, products };
    } catch (error) {
      throw new HttpException('Error generating payment URL', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('webhook')
  async webhook(@Body() data) {
    try {
      console.log(data);
      return data;
    } catch (error) {
      throw new HttpException('Error webhook', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
