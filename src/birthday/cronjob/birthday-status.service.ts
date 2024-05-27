import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  @Cron(CronExpression.EVERY_10_SECONDS)
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
        console.log(birthday);

        await this.notify(birthday);
      }
    } catch (error) {
      this.logger.error(`Error in handleCron: ${error.message}`);
    }
  }

  async notify(birthday: IBirthday) {
    try {
      const hoy = new Date().toISOString().slice(0, 10); // Get today's date
      const contacts = await this.getContacts(birthday.whatsAppNumber.tenantId);

      for (const contact of contacts) {
        console.log(contact);
        if (contact.birthDate === hoy) {
          const postData = {
            from: birthday.whatsAppNumber.number,
            to: contact.phones[0].number,
            operator: 'agent',
            type: 'template',
            mediaUrl: '',
            template: birthday.template,
            text: '',
            conversationId: 'c4a3ae11-24a8-4192-9138-6bb21ba768aa',
            temporalSmsId: uuidv4(),
            contactId: contact.id,
          };

          const response = await axios.post(
            `${this.configService.urlLuloChatBackend}/messaging-microservice`,
            postData,
            {
              params: {
                isMessageTemplate: true,
                apiKey: this.configService.apiKey,
              },
            }
          );
          this.logger.debug(`Notification sent for birthday: ${birthday.id}`);
          console.log(response.data);
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
}
