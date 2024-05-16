import { PaymentData } from '../dto/payment-data.dto';

export function WcPaymentDataAdapter(paymentData: PaymentData) {
  const products = paymentData.products?.map((product) => {
    return {
      product_id: product.productId,
      quantity: product.quantity,
    };
  });
  return {
    fullName: paymentData.billing,
    payment_method: 'bacs',
    payment_method_title: 'Direct Bank Transfer',
    set_paid: true,
    billing: {
      first_name: paymentData.billing.firstName,
      last_name: paymentData.billing.lastName,
      address_1: paymentData.billing.address,
      address_2: '',
      city: paymentData.billing.city,
      state: '',
      postcode: '',
      country: '',
      email: paymentData.billing.email,
      phone: paymentData.billing.phone,
    },
    shipping: {
      first_name: paymentData.billing.firstName,
      last_name: paymentData.billing.lastName,
      address_1: paymentData.billing.address,
      address_2: '',
      city: paymentData.billing.city,
      state: '',
      postcode: '',
      country: '',
    },
    line_items: products,
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: '10.00',
      },
    ],
  };
}
