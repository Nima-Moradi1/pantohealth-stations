export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export class ApiError extends Error {
  readonly status?: number;
  readonly cause?: unknown;

  constructor(
    message: string,
    status?: number,
    cause?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.cause = cause;
  }
}
