import { Comment } from "../comment.model";
import { Product } from "../product.model";
import * as ProductsActions from "./products.actions";

export interface State {
  products: Product[];
}

const initialState = {
  products: [],
}

export function productsReducer(
  state: State = initialState, action: ProductsActions.ProductsActions
) {
  switch (action.type) {
    case ProductsActions.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      }

    case ProductsActions.EDIT_PRODUCT:
      const editedProduct = {
        ...state.products[action.payload.index],
        ...action.payload.newProduct
      }
      const editedProducts = [...state.products];
      editedProducts[action.payload.index] = editedProduct;
      return {
        ...state,
        products: [...editedProducts]
      }

    default: return state;
  }
}