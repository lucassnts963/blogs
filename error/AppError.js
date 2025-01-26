export class AppError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.errorCode = errorCode;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
