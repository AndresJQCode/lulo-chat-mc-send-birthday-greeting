import { Injectable } from '@nestjs/common';
import { BirthdayRepository } from '../repositories/birthday.repository';
import { IBirthday } from '../interfaces/birthday.interface';

@Injectable()
export class BirthdayService {
  constructor(private readonly birthdayRepository: BirthdayRepository) {}

  async createBirthdaySettings(birthdaySetting: IBirthday) {
    try {
      const savedSettings = await this.birthdayRepository.saveSettings(birthdaySetting);
      return savedSettings;
    } catch (error) {
      throw new Error(`Error while creating birthday settings: ${error.message}`);
    }
  }

  async getBirthdaySettingsByTenantId(tenantId: string) {
    try {
      const savedSettings = await this.birthdayRepository.findByTenantId(tenantId);
      return savedSettings;
    } catch (error) {
      throw new Error(`Error while creating birthday settings: ${error.message}`);
    }
  }
}
