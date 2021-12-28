import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthReducer from "../auth/auth-store/auth.reducer";
import * as fromProductsReducer from "../products/products-store/products.reducer";

export interface AppState {
  auth: fromAuthReducer.State;
  products: fromProductsReducer.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuthReducer.authReducer,
  products: fromProductsReducer.productsReducer,
}