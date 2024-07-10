import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor() {}

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
