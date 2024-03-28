// TODO: Change name because it is the same as the ErrorResponse from Node

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors: Record<string, string[]>;
}
