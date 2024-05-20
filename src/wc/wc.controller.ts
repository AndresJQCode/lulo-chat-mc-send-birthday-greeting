import { Body, Controller, Post, HttpException, HttpStatus, Get } from '@nestjs/common';
import { WcService } from './services/wc.service';
import { WompiService } from './services/wompi.service';
import { PaymentDataDto } from './dto/payment-data.dto';
import { TransationsService } from './repositories/transactions.repository';
import { ResponseGenerateLink, ResponseOrders } from './interfaces/response.interface';

@Controller('wc')
export class WcController {
  constructor(
    private readonly wcService: WcService,
    private readonly wompiService: WompiService,
    private readonly transationsService: TransationsService
  ) {}

  @Get('orders')
  async getAllOrders(): Promise<ResponseOrders> {
    try {
      const orders = await this.wcService.getAllOrders();
      return orders;
    } catch (error) {
      throw new HttpException('Error getAllOrders', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('generate-payment-link')
  async generatePaymentLink(@Body() paymentData: PaymentDataDto): Promise<ResponseGenerateLink> {
    try {
      const paymentInfo = await this.wcService.createOrder(paymentData);
      const [paymentLink, code] = await this.wompiService.generateLinkPayment(paymentInfo);
      await this.transationsService.createTransaction(paymentInfo, code);
      const { id, line_items: products, billing, shipping, total, status } = paymentInfo;
      return { id, url: paymentLink, total, status, billing, shipping, products };
    } catch (error) {
      throw new HttpException(`Error generating payment URL: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
