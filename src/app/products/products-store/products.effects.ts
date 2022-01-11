import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Product } from "../products-models/product.model";
import * as ProductsActions from "./products.actions";
import * as fromAppReducer from "src/app/store/app.reducer";
import { Buyer } from "../products-models/buyer.model";
import { Order } from "../products-models/order.model";

@Injectable()
export class ProductsEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private store: Store<fromAppReducer.AppState>
  ) { }

  @Effect()
  getProducts = this.actions.pipe(
    ofType(ProductsActions.GET_PRODUCTS),
    switchMap(() => {
      return this.http.get<Product[]>('https://shopapp-22f84-default-rtdb.europe-west1.firebasedatabase.app/products.json')
    }),
    map(products => {
      if (products) {
        return products.map(product => {
          return {
            ...product,
            comments: product.comments ? product.comments : [],
          }
        });
      } else {
        return [];
      }
    }),
    map((products: Product[]) => {
      return new ProductsActions.SetProducts(products);
    })
  );

  @Effect({ dispatch: false })
  saveProducts = this.actions.pipe(
    ofType(ProductsActions.EDIT_PRODUCT),
    withLatestFrom(this.store.select('products')),
    switchMap(([action, state]) => {
      return this.http.put<Product[]>('https://shopapp-22f84-default-rtdb.europe-west1.firebasedatabase.app/products.json', state.products);
    })
  );

  @Effect()
  getBasket = this.actions.pipe(
    ofType(ProductsActions.GET_BASKET),
    switchMap(() => {
      return this.http.get<Buyer[]>('https://shopapp-22f84-default-rtdb.europe-west1.firebasedatabase.app/basket.json')
    }),
    map(basket => {
      return basket || [];
    }),
    map((basket: Buyer[]) => {
      return new ProductsActions.SetBasket(basket);
    })
  );

  @Effect({ dispatch: false })
  saveBasket = this.actions.pipe(
    ofType(ProductsActions.ADD_TO_BASKET, ProductsActions.SAVE_BASKET_STATE, ProductsActions.EDIT_BASKET),
    withLatestFrom(this.store.select('products')),
    switchMap(([action, state]) => {
      return this.http.put<Buyer[]>('https://shopapp-22f84-default-rtdb.europe-west1.firebasedatabase.app/basket.json', state.basket);
    })
  );

  @Effect({ dispatch: false })
  saveOrder = this.actions.pipe(
    ofType(ProductsActions.SAVE_ORDER),
    withLatestFrom(this.store.select('products')),
    switchMap(([action, state]) => {
      return this.http.post<Order[]>('https://shopapp-22f84-default-rtdb.europe-west1.firebasedatabase.app/orders.json', state.orders);
    })
  );
}