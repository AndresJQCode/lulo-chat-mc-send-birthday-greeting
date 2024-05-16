import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/database.service';
import { Transaction } from '../interfaces/transaction.interface';
import { PaymentInfoToTransactionModel } from './../adapters/payment-to-transaction.adapter';

@Injectable()
export class TransationsService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(trans: any, code: string): Promise<Transaction> {
    const data = PaymentInfoToTransactionModel(trans, code);
    return this.prisma.transaction.create({
      data,
    });
  }

  async getTransactionsByStatus(status: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: {
        status,
      },
    });
  }
}
