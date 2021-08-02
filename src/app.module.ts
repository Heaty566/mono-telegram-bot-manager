import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

//--------- Service

//---------Module

//---------Provider

//---------Utils
import { LoggerModule } from './utils/logger/logger.module';
import { RedisModule } from './utils/redis/redis.module';
import { PaymentModule } from './payment/payment.module';

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

            // --- Provider

            // --- Utils
            LoggerModule,
            RedisModule,
            PaymentModule,
      ],
      providers: [],
      controllers: [],
})
export class AppModule {}
