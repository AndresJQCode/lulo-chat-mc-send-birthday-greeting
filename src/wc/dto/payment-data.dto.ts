import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
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
  @IsNumber()
  @IsNotEmpty({ message: 'El productId debe ser un número y no puede estar vacío' })
  productId: number;

  @IsNumber()
  @IsNotEmpty({ message: 'La cantidad debe ser un número y no puede estar vacía' })
  quantity: number;
}

export class BillingDto implements Billing {
  @IsString({ message: 'El firstName debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  firstName: string;

  @IsString({ message: 'El lastName debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  lastName: string;

  @IsString({ message: 'La dirección debe ser un string y no puede estar vacía' })
  @IsNotEmpty()
  address: string;

  @IsString({ message: 'La ciudad debe ser un string y no puede estar vacía' })
  @IsNotEmpty()
  city: string;

  @IsString({ message: 'El estado debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  state: string;

  @IsString({ message: 'El email debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  email: string;

  @IsString({ message: 'El teléfono debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  phone: string;
}

export class PaymentDataDto implements PaymentData {
  @IsNotEmpty({ message: 'Los datos de facturación no pueden estar vacíos' })
  @ValidateNested()
  @Type(() => BillingDto)
  billing: BillingDto;

  @IsNotEmpty({ message: 'Los productos no pueden estar vacíos' })
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
