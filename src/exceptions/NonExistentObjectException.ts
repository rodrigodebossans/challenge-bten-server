import { GeneralException } from './GeneralException';

export class NonExistentObjectException extends GeneralException {
  constructor(httpStatusCode?: number, cause?: any) {
    super(
      'NonExistentObjectException',
      'The object you are looking for could not be found in our database',
      httpStatusCode,
      cause,
    );
  }
}