import { Buyer } from "../products-models/buyer.model";
import { Order } from "../products-models/order.model";
import { Product } from "../products-models/product.model";
import * as ProductsActions from "./products.actions";

export interface State {
  products: Product[];
  basket: Buyer[];
  orders: Order[];
}

const initialState: State = {
  products: [],
  basket: [],
  orders: [],
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
        ...action.payload.newProduct,
      }
      const editedProducts = [...state.products];
      editedProducts[action.payload.index] = editedProduct;
      return {
        ...state,
        products: [...editedProducts]
      }

    case ProductsActions.SET_BASKET:
      return {
        ...state,
        basket: action.payload,
      }

    case ProductsActions.ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      }

    case ProductsActions.REMOVE_FROM_BASKET:
      return {
        ...state,
        basket: state.basket.filter((item, index) => {
          return index !== action.payload;
        }),
      }

    case ProductsActions.EDIT_BASKET:
      const newCount = {
        ...state.basket[action.payload.index],
        ...action.payload.newBuyer,
      }
      const editedBasket = [...state.basket];
      editedBasket[action.payload.index] = newCount;
      return {
        ...state,
        basket: [...editedBasket]
      }

    case ProductsActions.SAVE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      }

    default: return state;
  }
}