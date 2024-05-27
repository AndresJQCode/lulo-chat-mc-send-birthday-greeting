import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Component, IBirthday, Template, WhatsAppNumber } from '../interfaces/birthday.interface';

export class ComponentDto implements Component {
  @IsString({ message: 'type debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  type: string;

  @IsString({ message: 'text debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  text: string;
}

export class TemplateDto implements Template {
  @IsString({ message: 'name debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @Type(() => ComponentDto)
  components: ComponentDto[];

  @IsString({ message: 'language debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  language: string;

  @IsString({ message: 'status debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  status: string;

  @IsString({ message: 'category debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  category: string;

  @IsString({ message: 'id debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  id: string;
}

export class WhatsAppNumberDto implements WhatsAppNumber {
  @IsString({ message: 'numberId debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  numberId: string;

  @IsString({ message: 'name debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  name: string;

  @IsString({ message: 'color debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  color: string;

  @IsString({ message: 'number debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  number: string;

  @IsString({ message: 'numberFormatted debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  numberFormatted: string;

  @IsString({ message: 'tenantId debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  tenantId: string;

  @IsString({ message: 'verifyToken debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  verifyToken: string;

  @IsString({ message: 'whatsappIntegrationId debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  whatsappIntegrationId: string;

  @IsBoolean({ message: 'webhookEnabled debe ser un booleano' })
  webhookEnabled: boolean;

  @IsString({ message: 'id debe ser un string y no puede estar vacío' })
  @IsNotEmpty()
  id: string;
}

export class BirthdaySettingsDto implements IBirthday {
  @IsNotEmpty({ message: 'whatsAppNumber no puede estar vacío' })
  @Type(() => WhatsAppNumberDto)
  whatsAppNumber: WhatsAppNumberDto;

  @IsNotEmpty({ message: 'template no puede estar vacío' })
  @Type(() => TemplateDto)
  template: TemplateDto;

  @IsString({ message: 'La hora no puede estar vacía' })
  @IsNotEmpty()
  hour: string;

  @IsBoolean({ message: 'El status debe ser un booleano' })
  @IsNotEmpty({ message: 'El status no puede estar vacío' })
  status: boolean;

  static fromBirthdaySettings(birthdaySettings: IBirthday): BirthdaySettingsDto {
    const dto = new BirthdaySettingsDto();
    dto.whatsAppNumber = Object.assign(new WhatsAppNumberDto(), birthdaySettings.whatsAppNumber);
    dto.template = Object.assign(new TemplateDto(), birthdaySettings.template);
    dto.hour = birthdaySettings.hour;
    dto.status = birthdaySettings.status;
    return dto;
  }
}
