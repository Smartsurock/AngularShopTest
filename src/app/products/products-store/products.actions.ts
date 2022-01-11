import { Action } from "@ngrx/store";
import { Buyer } from "../products-models/buyer.model";
import { Order } from "../products-models/order.model";
import { Product } from "../products-models/product.model";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_TO_BASKET = "ADD_TO_BASKET";
export const REMOVE_FROM_BASKET = "REMOVE_FROM_BASKET";
export const GET_BASKET = "GET_BASKET";
export const SET_BASKET = "SET_BASKET";
export const EDIT_BASKET = "EDIT_BASKET";
export const SAVE_BASKET_STATE = "SAVE_BASKET_STATE";
export const SAVE_ORDER = "SAVE_ORDER";

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) { }
}

export class EditProduct implements Action {
  readonly type = EDIT_PRODUCT;

  constructor(public payload: { newProduct: Product, index: number }) { }
}

export class GetBasket implements Action {
  readonly type = GET_BASKET;
}

export class SetBasket implements Action {
  readonly type = SET_BASKET;

  constructor(public payload: Buyer[]) { }
}

export class AddToBasket implements Action {
  readonly type = ADD_TO_BASKET;

  constructor(public payload: Buyer) { }
}

export class RemoveFromBasket implements Action {
  readonly type = REMOVE_FROM_BASKET;

  constructor(public payload: number) { }
}

export class EditBasket implements Action {
  readonly type = EDIT_BASKET;

  constructor(public payload: { newBuyer: Buyer, index: number }) { }
}

export class SaveBasketState implements Action {
  readonly type = SAVE_BASKET_STATE;
}

export class SaveOrder implements Action {
  readonly type = SAVE_ORDER;

  constructor(public payload: Order) { }
}

export type ProductsActions =
  | SaveOrder
  | SaveBasketState
  | EditProduct
  | AddToBasket
  | EditBasket
  | GetBasket
  | SetBasket
  | RemoveFromBasket
  | SetProducts
  | GetProducts;