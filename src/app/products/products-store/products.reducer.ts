import { Product } from "../product.model";
import * as ProductsActions from "./products.actions";

export interface State {
  products: Product[];
  basket: Product[];
}

const initialState = {
  products: [],
  basket: [],
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

    case ProductsActions.ADD_TO_BASKET:
      const addBasket = [...state.basket, state.products[action.payload]];
      return {
        ...state,
        basket: [...addBasket]
      }

    case ProductsActions.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item, index) => {
          return index !== action.payload;
        }),
      }

    default: return state;
  }
}