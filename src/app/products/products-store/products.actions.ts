import { Action } from "@ngrx/store";
import { Product } from "../product.model";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SAVE_PRODUCTS = "SAVE_PRODUCTS";

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

export class SaveProducts implements Action {
  readonly type = SAVE_PRODUCTS;
}

export type ProductsActions =
  | EditProduct
  | SaveProducts
  | SetProducts
  | GetProducts;