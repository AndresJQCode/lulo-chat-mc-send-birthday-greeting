export interface IBirthday {
  id?: string;
  whatsAppNumber: WhatsAppNumber;
  template: Template;
  hour: string;
  status: boolean;
}

export interface WhatsAppNumber {
  numberId: string;
  name: string;
  color: string;
  number: string;
  numberFormatted: string;
  tenantId: string;
  verifyToken: string;
  whatsappIntegrationId: string;
  webhookEnabled: boolean;
  webhookUrl?: string;
  id: string;
}

export interface Template {
  name: string;
  components: Component[];
  language: string;
  status: string;
  category: string;
  id: string;
}

export interface Component {
  type: string;
  text: string;
}

export interface Contact {
  tenantId: string;
  firstName: string;
  lastName: string;
  tag: string;
  phones: {
    isMobile: boolean;
    isWhatsAppCapable: boolean;
    number: string;
  }[];
  emails: string[];
  source: string[];
  pendingSince: string;
  messages: any[]; // Puedes definir el tipo de datos para este campo si es necesario
  birthDate: string;
  createdAt: string;
  id: string;
}
