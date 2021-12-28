import { Action } from "@ngrx/store";
import { Product } from "../product.model";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const GET_FILTERED_PRODUCTS = "GET_FILTERED_PRODUCTS";
export const SAVE_PRODUCTS = "SAVE_PRODUCTS";

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class SetProducts implements Action {
  readonly type = SET_PRODUCTS;

  constructor(public payload: Product[]) { }
}

export class GetFilteredProducts implements Action {
  readonly type = GET_FILTERED_PRODUCTS;

  constructor(public payload: string) { }
}

export class SaveProducts implements Action {
  readonly type = SAVE_PRODUCTS;
}

export type ProductsActions =
  | GetFilteredProducts
  | SaveProducts
  | SetProducts
  | GetProducts;