import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import * as ProductsActions from "../products/products-store/products.actions";
import { of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BasketResolver implements Resolve<any> {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('products').pipe(
      take(1),
      map(state => state.basket),
      switchMap(basket => {
        if (!basket.length) {
          this.store.dispatch(new ProductsActions.GetBasket());
          return this.actions.pipe(
            ofType(ProductsActions.SET_BASKET),
            take(1),
          );
        } else {
          return of(basket);
        }
      })
    );
  }
}