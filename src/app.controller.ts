import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('titles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/stories')
  getStories(): Promise<{}> {
    return this.appService.getStories();
  }

  @Get('/post')
  getPostOfLastWeek(): Promise<{}> {
    return this.appService.getPostOfLastWeek();
  }

  @Get('/karma')
  getKarmaStory(): Promise<{}> {
    return this.appService.getKarmaStories();
  }
}
