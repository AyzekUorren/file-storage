import { FilesService } from './files.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('files')
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload file' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'folderId',
    required: false,
    description: 'Parent Folder',
    type: Number,
  })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiResponse({
    status: 400,
    description: 'Missed required file',
  })
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('folderId')
    folderId?: number,
  ) {
    if (!file) {
      throw new HttpException('Missed required file', HttpStatus.BAD_REQUEST);
    }

    return await this.filesService.uploadFile({
      file,
      folderId,
    });
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }
}
