import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { BirthdaySettingsDto } from './dto/birthday-settings.dto';
import { BirthdayService } from './services/birthday.service';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Post('save-settings')
  async SaveSettings(@Body() birthdaySettingsDto: BirthdaySettingsDto) {
    try {
      const result = await this.birthdayService.createBirthdaySettings(birthdaySettingsDto);
      return result;
    } catch (error) {
      console.log('Error', error);
      throw new HttpException('Error SaveSettings' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
