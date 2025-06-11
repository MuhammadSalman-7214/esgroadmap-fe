export interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}
