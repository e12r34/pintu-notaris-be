import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JsonHeaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Set the Content-Type header to application/json for all incoming requests
    res.setHeader('Content-Type', 'application/json');
    
    res.setHeader('Accept', 'application/json');
    // console.log("middleware json header")
    next();
  }
}
