import { OrderStatus, TransacionStatus } from '../enums/transactions.enums';

export function TransactionToWc(transaction) {
  const { id, status } = transaction;
  return {
    payment_method: 'wompi',
    payment_method_title: transaction['payment-method-type'],
    transaction_id: id,
    status: status == TransacionStatus.APPROVED ? OrderStatus.COMPLETED : OrderStatus.FAILED,
    meta_data: [
      {
        key: '_wompi_payment_method_type',
        value: transaction['payment-method-type'],
      },
    ],
  };
}
