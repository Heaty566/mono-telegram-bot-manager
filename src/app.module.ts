import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//--------- Service

//---------Module
import { BotModule } from './bot/bot.module';

//---------Provider

//---------Utils
import { LoggerModule } from './utils/logger/logger.module';
import { RedisModule } from './utils/redis/redis.module';

//---------Entity

const Config = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./config/.env.${process.env.NODE_ENV}`,
});

@Module({
      imports: [
            // --- Config
            Config,

            ScheduleModule.forRoot(),

            // --- Module
            BotModule,

            // --- Provider

            // --- Utils
            LoggerModule,
            RedisModule,
      ],
      providers: [],
      controllers: [],
})
export class AppModule {}
