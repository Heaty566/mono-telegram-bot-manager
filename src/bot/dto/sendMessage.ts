interface SendMessage {
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
