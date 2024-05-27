import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BirthdayDocument = Birthday & Document;

@Schema()
class WhatsAppNumber {
  @Prop({ required: true })
  numberId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  numberFormatted: string;

  @Prop({ required: true })
  tenantId: string;

  @Prop({ required: true })
  verifyToken: string;

  @Prop({ required: true })
  whatsappIntegrationId: string;

  @Prop({ required: true })
  webhookEnabled: boolean;

  @Prop({ required: false })
  webhookUrl: string;

  @Prop({ required: true })
  id: string;
}

const WhatsAppNumberSchema = SchemaFactory.createForClass(WhatsAppNumber);

@Schema()
class Component {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  text: string;
}

const ComponentSchema = SchemaFactory.createForClass(Component);

@Schema()
class Template {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [ComponentSchema] })
  components: Component[];

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  id: string;
}

const TemplateSchema = SchemaFactory.createForClass(Template);

@Schema()
export class Birthday {
  @Prop({ type: WhatsAppNumberSchema, required: true })
  whatsAppNumber: WhatsAppNumber;

  @Prop({ type: TemplateSchema, required: true })
  template: Template;

  @Prop({ required: true })
  hour: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true })
  proccesing: boolean;

  @Prop({ required: true })
  tenantId: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);

BirthdaySchema.index({ 'whatsAppNumber.tenantId': 1, 'whatsAppNumber.name': 1 }, { unique: true });

BirthdaySchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});
