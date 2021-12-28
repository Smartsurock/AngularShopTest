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

    case ProductsActions.GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.category === action.payload;
        })
      }

    default: return state;
  }
}