export class GeneralException implements Error {
  public name: string;
  public message: string;
  public httpStatusCode: number;
  public cause: any;

  constructor(
    name: string,
    message: string,
    httpStatusCode?: number,
    cause?: any,
  ) {
    this.name = name;
    this.message = message;

    if (httpStatusCode) this.httpStatusCode = httpStatusCode;
    if (cause) this.cause = cause;
  }

  toString(): string {
    return `Error: ${this.name}, Message: ${this.message}`;
  }
}