import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(
    @Query('page', ParseIntPipe) page: number,
    @Query('per_page') per_page: number = 10,
    @Query('createdAfter') createdAfter: string,
    @Query('createdBefore') createdBefore: string,
    @Query('status') status: string,
    @Query('orderNumber') orderNumber: number
  ) {
    return this.ordersService.getAllOrders({
      page,
      per_page: isNaN(per_page) ? 10 : per_page,
      status: status ? status : 'any',
      createdAfter,
      createdBefore,
      orderNumber,
    });
  }

  @Get(':id')
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.getOrderById(id);
  }
}
