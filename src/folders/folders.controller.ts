import { Controller, Get, UseGuards } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { SessionGuard } from '../common/guards/session.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Folders')
@Controller('folders')
@UseGuards(SessionGuard)
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}
  @Get()
  findAll() {
    return this.foldersService.findAll();
  }
}
