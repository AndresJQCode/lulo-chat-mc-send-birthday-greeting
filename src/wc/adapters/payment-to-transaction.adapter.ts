export function PaymentInfoToTransactionModel(paymentInfo, paymentLink) {
  const { id, status, total } = paymentInfo;
  return {
    paymentId: `${id}`,
    value: parseFloat(total),
    date: new Date(),
    status: status,
    paymentLink: paymentLink,
  };
}
