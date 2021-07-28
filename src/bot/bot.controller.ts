import { Controller } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      handleBotListener() {
            //
      }
}
