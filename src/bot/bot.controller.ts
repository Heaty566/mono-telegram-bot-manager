import { Body, Controller, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
import { WebhookResponse } from './dto/webhookResponse';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      async handleBotListener(@Req() request: Request, @Body() body: WebhookResponse, @Res() response: Response) {
            console.log(request.hostname);
            try {
                  await this.botService.sendMessage({
                        chatId: String(body.message.chat.id),
                        level: 'INFO',
                        message: this.botService.getDescription(body.message.text.toLowerCase()),
                  });
            } catch (error) {
                  console.log(error);
            } finally {
                  response.send('ok');
            }
      }
}
