import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllOrders(query: {
    page: number;
    per_page: number;
    status: string;
    createdBefore: string;
    createdAfter: string;
    orderNumber: number;
  }) {
    console.log(query);

    return {
      total: 0,
      data: [],
    };
  }

  async getOrderById(id: number) {
    return id;
  }
}
