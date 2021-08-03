import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OnApplicationBootstrap } from '@nestjs/common';
import { config } from '../config';
import axios from 'axios';

@Injectable()
export class BotService implements OnApplicationBootstrap {
      constructor(private readonly jwtService: JwtService) {}

      async onApplicationBootstrap() {
            // init webhook
            if (process.env.IS_INIT_CONNECT !== 'DISABLE') {
                  const url = `${config.telegramUrl}${process.env.TELEGRAM_BOT_TOKEN}/setWebhook?url=${process.env.SERVER_URL}/bot`;
                  axios.get(url)
                        .then(() => {
                              this.sendMessage({
                                    chatId: process.env.CHAT_ID,
                                    message: 'Initialize Successfully \n' + `Server Url: ${process.env.SERVER_URL}/bot`,
                                    level: 'INFO',
                              });
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }
      }

      async sendMessage({ chatId, message, level }: SendMessage) {
            const formatMessage =
                  `[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}] Level: ${level} \n\n` +
                  `${message}\n\n` +
                  '- - - - - - - - - - - - - - - - - - - - -';

            const url = `${config.telegramUrl}${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatId}&text=${formatMessage}`;

            return await axios.get(url);
      }

      encryptToken(tokenData: Record<any, any>) {
            try {
                  return this.jwtService.sign(JSON.stringify(tokenData));
            } catch (err) {
                  return null;
            }
      }

      verifyToken<T>(tokenData: string) {
            try {
                  return this.jwtService.verify<any>(tokenData) as T;
            } catch (err) {
                  return null;
            }
      }
      private command = {
            hello: 'Test Connection',
            summary: 'Test command summary',
            ok: 'Test command ok',
            no: 'Test command no',
      };

      getDescription(str: string) {
            const helpCommand =
                  'BOT commands: \n' +
                  '-------------------\n' +
                  Object.keys(this.command)
                        .map((item) => `'${item}' : ${this.command[item]} `)
                        .join('\n') +
                  '-------------------\n' +
                  '\nPlease type to send a command ';

            Object.keys(this.command).map((item) => {
                  if (item === str) {
                        return this.command[item];
                  }
            });

            if (str === 'help') {
                  return helpCommand;
            }

            return "Invalid command type 'help' to print all available command";
      }
}
