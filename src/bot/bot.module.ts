import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
      controllers: [BotController],
      providers: [
            BotService,
            {
                  provide: JwtService,
                  useFactory: () => {
                        return new JwtService({ secret: process.env.JWT_SECRET_KEY });
                  },
            },
      ],
})
export class BotModule {}
