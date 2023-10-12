import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } 
    else if (exception instanceof QueryFailedError) {
        // Handle TypeORM QueryFailedError (database-related error)
        status = HttpStatus.BAD_REQUEST;
        message = 'Database query error';
        const sqlErrorMessage = exception.message;

        // Include the SQL error message in the response
        message += `: ${sqlErrorMessage}`;
  
    } 
    

    response.status(status).json({
      status,
      error: message,
    });
  }
}
