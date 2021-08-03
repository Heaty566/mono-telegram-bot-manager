import { Body, Controller, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
import { WebhookResponse } from './dto/webhookResponse';
import { SendMessage, vSendMessageValidator } from './dto/sendMessage';
import { JoiValidatorPipe } from 'src/utils/validator/validator.pipe';
import { BotGuard } from './bot.guard';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}

      @Post('')
      async handleBotListener(@Req() request: Request, @Body() body: WebhookResponse, @Res() response: Response) {
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

      @Post('/send')
      @UseGuards(BotGuard)
      @UsePipes(new JoiValidatorPipe(vSendMessageValidator))
      async handleBotSender(@Body() body: SendMessage, @Res() response: Response) {
            try {
                  await this.botService.sendMessage({
                        chatId: String(body.chatId),
                        level: 'INFO',
                        message: this.botService.getDescription(body.message.toLowerCase()),
                  });
            } catch (error) {
                  return response.send(error.response.data);
            }

            response.send('ok');
      }
}
