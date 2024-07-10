import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionGuard } from './common/guards/session.guard';

@Controller()
@UseGuards(SessionGuard)
export class AppController {
  @Get()
  getStatus() {
    return { status: 'ok' };
  }
}
