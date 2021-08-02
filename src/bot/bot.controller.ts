import { Body, Controller, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
import { WebhookResponse } from './dto/webhookResponse';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      handleBotListener(@Body() body: WebhookResponse, @Res() response: Response) {
            const command = body.message.text.toLowerCase();
            switch (command) {
                  case 'hello':
                        this.botService.sendMessage({ chatId: String(body.message.chat.id), level: 'INFO', message: 'hi' });
                        break;
                  default:
                        this.botService.sendMessage({ chatId: String(body.message.chat.id), level: 'INFO', message: 'help' });
                        break;
            }
            response.send('ok');
      }
}
