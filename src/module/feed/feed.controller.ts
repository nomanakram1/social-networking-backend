import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FeedService } from './feed.service';
import { CreateFeedDto } from './dto/create-feed.dto';
import { FileUpload } from 'src/interceptors/file-upload.interceptor';

@Controller('feed')
@ApiTags('feed')
export class FeedController {
  constructor(@Inject(FeedService) private readonly feedService: FeedService) {}

  @Get()
  async findAll(
    @Query()
    queryParams: {
      appartment_id: number | undefined;
      resident_id: number | undefined;
    },
  ) {
    return await this.feedService.findAll(queryParams);
  }

  @Get(':searchTerm') // Define a new endpoint with a parameter
  async findByNameOrId(@Param('searchTerm') searchTerm: string) {
    const result = await this.feedService.findByNameOrId(searchTerm);
    if (!result) {
      // Handle not found, e.g., return a 404 response
    }
    return result;
  }
}
