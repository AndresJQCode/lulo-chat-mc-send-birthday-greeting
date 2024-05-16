import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export interface PaymentData {
  billing: Billing;
  products: Products[];
}

export interface Billing {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  email: string;
  phone: string;
}

export interface Products {
  productId: number;
  quantity: number;
}

export class ProductDto implements Products {
  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  quantity: number;
}

export class BillingDto implements Billing {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;
}

export class PaymentDataDto implements PaymentData {
  @ValidateNested()
  @Type(() => BillingDto)
  billing: BillingDto;

  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];

  static fromPaymentData(paymentData: PaymentData): PaymentDataDto {
    const dto = new PaymentDataDto();
    dto.billing = Object.assign(new BillingDto(), paymentData.billing);
    dto.products = paymentData.products.map((product) => Object.assign(new ProductDto(), product));
    return dto;
  }
}
