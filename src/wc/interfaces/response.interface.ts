export interface ResponseGenerateLink {
  id: number;
  url: string;
  total: string;
  status: string;
  billing: Billing;
  shipping: Shipping;
  products: Product[];
}

export interface Billing {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface Shipping {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
  sku?: string;
  price: number;
  image: Image;
  parent_name: any;
}

export interface Image {
  id: any;
  src: string;
}

export interface ResponseOrders {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  version: string;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  customer_id: number;
  order_key: string;
  billing: Billing;
  shipping: Shipping;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  customer_ip_address: string;
  customer_user_agent: string;
  created_via: string;
  customer_note: string;
  date_completed?: string;
  date_paid: string;
  cart_hash: string;
  number: string;
  meta_data: MetaDaum[];
  line_items: LineItem[];
  tax_lines: any[];
  shipping_lines: ShippingLine[];
  fee_lines: any[];
  coupon_lines: any[];
  refunds: any[];
  payment_url: string;
  is_editable: boolean;
  needs_payment: boolean;
  needs_processing: boolean;
  date_created_gmt: string;
  date_modified_gmt: string;
  date_completed_gmt?: string;
  date_paid_gmt: string;
  currency_symbol: string;
  _links: Links;
}

export interface MetaDaum {
  id: number;
  key: string;
  value: string;
}

export interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  subtotal_tax: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
  sku?: string;
  price: number;
  image: Image;
  parent_name: any;
}

export interface Image {
  id: any;
  src: string;
}

export interface ShippingLine {
  id: number;
  method_title: string;
  method_id: string;
  instance_id: string;
  total: string;
  total_tax: string;
  taxes: any[];
  meta_data: any[];
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface ResponseTransactionWompi {
  id: string;
  created_at: string;
  finalized_at: string;
  amount_in_cents: number;
  reference: string;
  customer_email: string;
  currency: string;
  payment_method_type: string;
  payment_method: PaymentMethod;
  status: string;
  status_message: any;
  shipping_address: any;
  redirect_url: any;
  payment_source_id: any;
  payment_link_id: string;
  customer_data: CustomerData;
  bill_id: any;
  disbursement: any;
}

export interface PaymentMethod {
  type: string;
  extra: Extra;
  user_type: string;
  sandbox_status: string;
  payment_description: string;
}

export interface Extra {
  is_three_ds: boolean;
  async_payment_url: string;
  external_identifier: string;
}

export interface CustomerData {
  full_name: string;
  phone_number: string;
}
