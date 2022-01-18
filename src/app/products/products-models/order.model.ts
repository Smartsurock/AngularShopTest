import { Buyer } from "./buyer.model";
import { Delivery } from "./delivery.model";

export class Order {
  constructor(
    public goods: Buyer[],
    public delivery: Delivery,
    public totalPrice: number,
  ) { }
}