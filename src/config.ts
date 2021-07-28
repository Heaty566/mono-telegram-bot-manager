/**
 *----------------------------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------------------------
 *----- This is a global config file contains constant of every routers in this project
 *----- Please the document carefully before changing any thing in this file
 *----- This file is not an environment variable file, please do not store any sensitive information in this file
 *----------------------------------------------------------------------------------------------------
 *----------------------------------------------------------------------------------------------------
 */

export const config: Config = {
      telegramUrl: 'https://api.telegram.org/bot',
};

interface Config {
      telegramUrl: string;
}
