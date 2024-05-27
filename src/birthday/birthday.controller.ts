import { Body, Controller, Post, HttpException, HttpStatus, Param, Get } from '@nestjs/common';
import { BirthdaySettingsDto } from './dto/birthday-settings.dto';
import { BirthdayService } from './services/birthday.service';

@Controller('birthday')
export class BirthdayController {
  constructor(private readonly birthdayService: BirthdayService) {}

  @Get('settings/:tenantId')
  async getBirthdaysByTenantId(@Param('tenantId') tenantId: string) {
    try {
      const result = await this.birthdayService.getBirthdaySettingsByTenantId(tenantId);
      return result;
    } catch (error) {
      throw new HttpException(
        'Error getting birthdays by tenantId: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('save-settings')
  async SaveSettings(@Body() birthdaySettingsDto: BirthdaySettingsDto) {
    try {
      const result = await this.birthdayService.createBirthdaySettings(birthdaySettingsDto);
      return result;
    } catch (error) {
      throw new HttpException('Error SaveSettings' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
