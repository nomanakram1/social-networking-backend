import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { DatabaseService } from './sqlite.servise';
import { AppartmentServise } from './appartment.servise';
import { AppartmentController } from './appartment.controller';
import { ResidentController } from './resident.controller';
import { ResidentServise } from './resident.service';
@Module({
  imports: [],
  controllers: [FeedController, AppartmentController, ResidentController],
  providers: [FeedService, AppartmentServise, ResidentServise, DatabaseService],
})
export class FeedModule {}
