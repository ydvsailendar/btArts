import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GallaryModule } from './gallary/gallary.module';

@Module({
  imports: [UsersModule, GallaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
