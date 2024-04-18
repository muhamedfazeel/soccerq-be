export class SoccerQResponse {
  status: number | undefined;
  data: object | Array<object> | undefined | null;
  message: string | undefined | null;

  constructor(
    status: number,
    data: object | Array<object> | null,
    message?: string | undefined | null
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
  }
}
