import { Controller, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      handleBotListener(@Req() request: Request, @Res() response: Response) {
            console.log(request.body);
            this.botService.sendMessage({ chatId: process.env.CHAT_ID, level: 'INFO', message: 'hello' });
            response.send('ok');
      }
}
