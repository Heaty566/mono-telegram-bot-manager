import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { google } from 'googleapis';
import { Auth, gmail_v1 } from 'googleapis/build/src/index';
import { LoggerService } from '../utils/logger/logger.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PaymentService implements OnApplicationBootstrap {
      private readonly GOOGLE_LABEL_IDS = ['INBOX'];
      private readonly GOOGLE_LABEL_FILTER_ACTION = 'exclude';

      constructor(private readonly logger: LoggerService) {}

      private oAuth2Client: Auth.OAuth2Client;
      private gmail: gmail_v1.Gmail;

      async onApplicationBootstrap() {
            this.oAuth2Client = new google.auth.OAuth2(
                  process.env.GOOGLE_CLIENT_ID,
                  process.env.GOOGLE_CLIENT_SECRET,
                  process.env.GOOGLE_CLIENT_REDIRECT_URI,
            );
            this.oAuth2Client.setCredentials({
                  access_token: process.env.GOOGLE_EMAIL_ACCESS_TOKEN,
                  refresh_token: process.env.GOOGLE_EMAIL_REFRESH_TOKEN,
                  scope: process.env.GOOGLE_EMAIL_SCOPE,
                  token_type: process.env.GOOGLE_EMAIL_TOKEN_TYPE,
                  expiry_date: Number(process.env.GOOGLE_EMAIL_EXPIRY_DATA),
            });
            this.gmail = google.gmail({ version: 'v1', auth: this.oAuth2Client });
            this.autoRenewWatcher();
      }

      @Cron('0 0 */5 * *')
      private async autoRenewWatcher() {
            await this.setupWatcher(process.env.GOOGLE_PUB_SUB_TOPIC_NAME);
      }

      setupWatcher(topicName: string) {
            return this.gmail.users
                  .watch({
                        userId: 'me',
                        requestBody: {
                              labelFilterAction: this.GOOGLE_LABEL_FILTER_ACTION,
                              labelIds: this.GOOGLE_LABEL_IDS,
                              topicName,
                        },
                  })
                  .then(() => {
                        return Promise.resolve(true);
                  })
                  .catch((error) => {
                        this.logger.print(error, __filename, 'error');
                        return Promise.reject(false);
                  });
      }

      private async readEmail() {
            const res = await this.gmail.users.messages.list({ userId: 'me', q: 'is:unread' });
      }
}
