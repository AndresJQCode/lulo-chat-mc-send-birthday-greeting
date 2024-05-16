export function WompiDataAdapter(paymentInfo) {
  const { id, currency, total } = paymentInfo;
  return {
    name: `Pago de pedido #${id}`,
    description: ' ',
    single_use: true,
    collect_shipping: false,
    currency: currency,
    amount_in_cents: Number(`${total}00`),
    customer_data: {
      id_pago: id,
    },
  };
}
