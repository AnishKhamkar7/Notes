export default class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Get the stack trace without using captureStackTrace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      // Fallback for environments where captureStackTrace is not available
      this.stack = new Error().stack;
    }

    this.name = this.constructor.name;
  }
}
