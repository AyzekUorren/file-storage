import { Controller, Get, UseGuards } from '@nestjs/common';
import { SessionGuard } from './common/guards/session.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Api')
@Controller()
@UseGuards(SessionGuard)
export class AppController {
  @Get()
  getStatus() {
    return { status: 'ok' };
  }
}
