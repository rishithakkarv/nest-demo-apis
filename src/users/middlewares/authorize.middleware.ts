import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthorizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send({
        success: false,
        data: null,
        msg: 'Authentication is not provided!',
      });
    } else if (authorization === 'Bearer jwt') {
      // Will validate JWT here
      next();
    } else {
      return res
        .status(401)
        .send({ success: false, data: null, msg: 'User is not authorized' });
    }
  }
}
