import {
  Controller,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucket') bucket: string,
    @Body('folder') folder?: string,
  ) {
    if (!bucket) {
      throw new BadRequestException('Bucket name is required');
    }

    return this.uploadService.uploadImage(file, bucket, folder);
  }

  @Delete('image')
  async deleteImage(
    @Body('bucket') bucket: string,
    @Body('path') path: string,
  ) {
    if (!bucket || !path) {
      throw new BadRequestException('Bucket and path are required');
    }

    await this.uploadService.deleteImage(bucket, path);
    return { message: 'File deleted successfully' };
  }
}
