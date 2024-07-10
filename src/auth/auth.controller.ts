import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const redirectUrl = req.session.redirectUrl || '/';
    req.session.user = req.user;
    res.redirect(redirectUrl);
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.session.destroy();
    res.redirect('/');
  }
}
