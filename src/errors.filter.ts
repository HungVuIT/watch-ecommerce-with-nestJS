import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (error.name === 'BadRequestException') {
      return response.status(status).send({
        ...error['response'],
        success: false,
      });
    } else
      return response.status(status).send({
        ...error,
        success: false,
      });

    // if (status === HttpStatus.UNAUTHORIZED)
    //     return response.status(status).render('views/401');

    // if (status === HttpStatus.NOT_FOUND)
    //     return response.status(status).render('views/404');
    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //     if (process.env.NODE_ENV === 'production') {
    //       console.error(error.stack);
    //       return response.status(status).render('views/500');
    //     }
    //     else {
    //       let message = error.stack;
    //       return response.status(status).send(message);
    //     }
    // }
  }
}
