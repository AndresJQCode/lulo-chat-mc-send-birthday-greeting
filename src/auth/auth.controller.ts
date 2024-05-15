import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { UserSession } from './interfaces/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request & { user: UserSession }) {
    return this.authService.login(req.user);
  }
}
