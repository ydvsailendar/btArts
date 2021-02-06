import { Module } from '@nestjs/common';
import { GallaryController } from './gallary.controller';
import { GallaryService } from './gallary.service';

@Module({
  controllers: [GallaryController],
  providers: [GallaryService]
})
export class GallaryModule {}
