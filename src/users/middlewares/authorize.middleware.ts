import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class AuthorizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('req.header: ', req.headers);
    if (req.headers?.authorization) {
      // Will validate JWT here
      next();
    } else {
      throw new HttpException('User not authorized!', HttpStatus.UNAUTHORIZED);
    }
  }
}
