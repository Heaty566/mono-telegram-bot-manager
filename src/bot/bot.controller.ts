import { Body, Controller, Req, Res } from '@nestjs/common';
import { BotService } from './bot.service';
import { Post } from '@nestjs/common';

import { Request, Response } from 'express';
import { WebhookResponse } from './dto/webhookResponse';

@Controller('bot')
export class BotController {
      constructor(private readonly botService: BotService) {}
      private command = [
            {
                  command: 'hello',
                  description: 'Test Connection',
            },
            {
                  command: 'summary',
                  description: 'Test command summary',
            },
            {
                  command: 'ok',
                  description: 'Test command ok',
            },
            {
                  command: 'no',
                  description: 'Test command no',
            },
      ];

      @Post('')
      handleBotListener(@Req() request: Request, @Body() body: WebhookResponse, @Res() response: Response) {
            console.log(request.hostname);
            try {
                  const helpMessage =
                        'BOT commands: \n' +
                        this.command.map((item) => `${item.command} : ${item.description} `).join('\n') +
                        '\nPlease type to send a command ';

                  const command = body.message.text.toLowerCase();
                  switch (command) {
                        case 'hello':
                              this.botService.sendMessage({
                                    chatId: String(body.message.chat.id),
                                    level: 'INFO',
                                    message: this.command[0].description,
                              });
                              break;
                        case 'summary':
                              this.botService.sendMessage({
                                    chatId: String(body.message.chat.id),
                                    level: 'INFO',
                                    message: this.command[1].description,
                              });
                              break;
                        case 'ok':
                              this.botService.sendMessage({
                                    chatId: String(body.message.chat.id),
                                    level: 'INFO',
                                    message: this.command[2].description,
                              });
                              break;
                        case 'no':
                              this.botService.sendMessage({
                                    chatId: String(body.message.chat.id),
                                    level: 'INFO',
                                    message: this.command[3].description,
                              });
                              break;
                        case 'help':
                              this.botService.sendMessage({ chatId: String(body.message.chat.id), level: 'INFO', message: helpMessage });
                              break;
                        default:
                              this.botService.sendMessage({
                                    chatId: String(body.message.chat.id),
                                    level: 'INFO',
                                    message: `Invalid command type: 'help' to print all available command`,
                              });
                              break;
                  }
            } catch (error) {
                  console.log(error);
            } finally {
                  response.send('ok');
            }
      }
}
