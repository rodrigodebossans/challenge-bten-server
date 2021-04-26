import { GeneralException } from './GeneralException';

export class UninformedDataException extends GeneralException {
  constructor(httpStatusCode?: number, cause?: any) {
    super(
      'UninformedDataException',
      'The data needed to fulfill the request was not provided correctly',
      httpStatusCode,
      cause,
    );
  }
}