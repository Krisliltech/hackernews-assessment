import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = await app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return an object of the 10 most occurring words in the title of the past 25 stories', async () => {
      expect(appController.getStories()).toBeTruthy();
      expect(typeof appController.getStories()).toBe("object");
    });

    it('should return an object of the 10 most occurring words in the title of exactly the last week', async () => {
      expect(appController.getPostOfLastWeek()).toBeTruthy();
      expect(typeof appController.getStories()).toBe("object");
    });

    it('should return an object of the 10 most occurring words in the title of the last 600 stories of users with at least 10.000 karma', async () => {
      expect(appController.getKarmaStory).toBeTruthy();
      expect(typeof appController.getStories()).toBe("object")
    });
  });
});
