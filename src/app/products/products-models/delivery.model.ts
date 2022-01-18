export class Delivery {
  constructor(
    public mailService: string,
    public address: string,
    public receiver: string,
    public telephone: string,
    public payment: string,
    public userMail: string,
  ) { }
}