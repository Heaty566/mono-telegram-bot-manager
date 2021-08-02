import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { router } from './router';

async function bootstrap() {
      const app = await NestFactory.create(AppModule);

      const logger = new Logger('SERVER');
      app.enableShutdownHooks();

      //init all middleware
      router(app);
      const port = process.env.PORT || 4000;

      await app.listen(port, () => {
            logger.log(`Listening on port ${port}`);
            logger.log(`Current NODE_ENV: ${process.env.NODE_ENV}`);
            logger.log(`Current Webhook URL: ${process.env.SERVER_URL}/bot`);
            logger.log(`Cors allows access: ${process.env.CLIENT_URL}`);
            logger.log(`Current ChatId: ${process.env.CHAT_ID}`);
            logger.log('Ready for service');
      });
}
bootstrap();
