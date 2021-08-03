import * as Joi from 'joi';

export interface SendMessage {
      /**
       * @description group chat id
       */
      chatId: string;

      /**
       * @description message to send
       */
      message: string;

      /**
       * @description message to send
       */
      level: 'INFO' | 'ERROR' | 'WARN';
}

export const vSendMessageValidator = Joi.object({
      chatId: Joi.number().required(),
      message: Joi.string().required(),
      level: Joi.string().allow('INFO', 'ERROR', 'WARN').required(),
});
