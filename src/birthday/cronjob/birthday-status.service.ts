import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import configurations from 'src/core/config/configurations';
import { ConfigType } from '@nestjs/config';
import { BirthdayService } from '../services/birthday.service';
import { BirthdayRepository } from '../repositories/birthday.repository';
import { Contact, IBirthday } from '../interfaces/birthday.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BirthdayStatusCronjobService {
  constructor(
    private readonly birthdayService: BirthdayService,
    private readonly birthdayRepository: BirthdayRepository,
    @Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>
  ) {}
  urlLuloChatBackend;
  private readonly logger = new Logger(BirthdayStatusCronjobService.name);

  @Cron('*/50 * * * * *')
  async handleCron() {
    this.logger.debug('Executing cron job');

    try {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const birthdays = await this.birthdayRepository.find({
        status: true,
        hour: `${currentHour}:${currentMinute}`,
      });

      for (const birthday of birthdays) {
        if (birthday.proccesing == false) {
          await this.birthdayRepository.updateProcessingStatus(birthday.id, true);
          await this.notify(birthday);
          await this.birthdayRepository.updateProcessingStatus(birthday.id, false);
        }
      }
    } catch (error) {
      this.logger.error(`Error in handleCron: ${error.message}`);
    }
  }

  async notify(birthday: IBirthday) {
    try {
      const hoy = new Date();
      const hoySinAño = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()); // Elimina el año de hoy
      const contacts = await this.getContacts(birthday.whatsAppNumber.tenantId);

      for (const contact of contacts) {
        const contactBirthday = new Date(contact.birthDate);
        const contactBirthdaySinAño = new Date(
          hoy.getFullYear(),
          contactBirthday.getMonth(),
          contactBirthday.getDate()
        ); // Elimina el año del cumpleaños del contacto

        if (contactBirthdaySinAño.getTime() === hoySinAño.getTime()) {
          // Compara solo día y mes
          const { name } = birthday.template;

          //const conversationId = await this.getConversationId(contact.tenantId);
          const postData = {
            from: birthday.whatsAppNumber.number,
            to: contact.phones[0].number,
            operator: 'agent',
            type: 'template',
            mediaUrl: '',
            template: {
              name,
              language: {
                code: 'es',
              },
            },
            text: '',
            temporalSmsId: uuidv4(),
            contactId: contact.id,
          };

          const response = await axios.post(
            `${this.configService.urlLuloChatBackend}/messaging-microservice/send-message/${contact.tenantId}`,
            postData,
            {
              params: {
                isMessageTemplate: true,
                apiKey: this.configService.apiKey,
              },
            }
          );
          this.logger.debug(`Notification sent for birthday: ${birthday.id}`);
          return response;
        }
      }
    } catch (error) {
      this.logger.error(`Error in notify: ${error.message}`);
    }
  }

  async getContacts(tenantId: string): Promise<Contact[]> {
    try {
      const contactsResponse = await axios.get(`${this.configService.urlLuloChatBackend}/contact-microservice`, {
        params: {
          tenantId: tenantId,
          apiKey: this.configService.apiKey,
        },
      });

      return contactsResponse.data;
    } catch (error) {
      this.logger.error(`Error in getContacts: ${error.message}`);
      throw error; // Re-throw the error to propagate it
    }
  }

  async getConversationId(tenantId: string) {
    try {
      const conversationIdResponse = await axios.get(
        `${this.configService.urlLuloChatBackend}/messaging-microservice/conversationId/${tenantId}`,
        {
          params: {
            tenantId: tenantId,
            apiKey: this.configService.apiKey,
          },
        }
      );
      return conversationIdResponse.data;
    } catch (error) {
      this.logger.error(`Error in getConversationId: ${error.message}`);
      throw error; // Re-throw the error to propagate it
    }
  }
}
