import { InvalidRequest } from '../types/lib';

export class ApiError extends Error {
  constructor(
    public response: InvalidRequest,
    message: string,
  ) {
    super(message);
  }
}
