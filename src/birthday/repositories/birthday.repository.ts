import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from 'src/core/database/entity.repository';
import { Birthday, BirthdayDocument } from '../schemas/birthday.shema';
import { IBirthday } from '../interfaces/birthday.interface';

@Injectable()
export class BirthdayRepository extends EntityRepository<BirthdayDocument> {
  constructor(@InjectModel(Birthday.name) private readonly birthdayModel: Model<BirthdayDocument>) {
    super(birthdayModel);
  }

  async saveSettings(settings: IBirthday): Promise<BirthdayDocument> {
    // Map the settings to a new Birthday document
    const newBirthday = new this.birthdayModel({
      whatsAppNumber: settings.whatsAppNumber,
      template: settings.template,
      hour: settings.hour,
      status: settings.status,
      createdAt: new Date(),
    });

    // Save the new Birthday document to the database
    return await newBirthday.save();
  }

  async find(query: any): Promise<BirthdayDocument[]> {
    return this.birthdayModel.find(query).exec();
  }
}
