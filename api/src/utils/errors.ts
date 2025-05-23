export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AppError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class SocketError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "SocketError";

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
