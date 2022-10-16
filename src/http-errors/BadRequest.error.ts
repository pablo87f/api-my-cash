import { HttpException, HttpStatus } from '@nestjs/common';
import AppError from 'src/@core/application/errors/app.error';

export class BadRequestError extends HttpException {
  constructor(readonly appError: AppError) {
    super(appError, HttpStatus.BAD_REQUEST);
  }
}
