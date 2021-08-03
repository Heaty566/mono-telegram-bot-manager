import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';

//---- Common
import { apiResponse } from '../app/interface/apiResponse';
import { BotService } from './bot.service';
import { SendMessage } from './dto/sendMessage';

@Injectable()
export class BotGuard implements CanActivate {
      constructor(private botService: BotService, private readonly reflector: Reflector) {}

      async canActivate(context: ExecutionContext) {
            const req: Request = context.switchToHttp().getRequest();
            const decrypt: SendMessage = this.botService.verifyToken(req.body.code);
            if (decrypt === null) {
                  throw apiResponse.sendError({ details: {} }, 'ForbiddenException');
            }
            req.body = decrypt;

            return true;
      }
}
