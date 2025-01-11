export class HttpError extends Error {
  public statusCode: number;

  constructor(
    message: string = "Internal Server Error",
    statusCode: number = 500
  ) {
    super(message); // Pass message to the base Error class
    this.statusCode = statusCode;

    // Ensure proper stack trace (only necessary for older environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}
