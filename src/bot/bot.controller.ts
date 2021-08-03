import { Body, Controller, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
import { WebhookResponse } from './dto/webhookResponse';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      handleBotListener(@Req() request: Request, @Body() body: WebhookResponse, @Res() response: Response) {
            console.log(request.hostname);
            try {
                  this.botService.sendMessage({
                        chatId: String(body.message.text.toLowerCase()),
                        level: 'INFO',
                        message: this.botService.getDescription(String(body.message.chat.id)),
                  });
            } catch (error) {
                  console.log(error);
            } finally {
                  response.send('ok');
            }
      }
}
