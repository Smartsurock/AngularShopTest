import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import * as ProductsActions from "./products-store/products.actions";

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<any> {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private actions: Actions,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('products').pipe(
      take(1),
      map(products => products.products),
      switchMap(products => {
        if (!products.length) {
          this.store.dispatch(new ProductsActions.GetProducts());
          return this.actions.pipe(
            ofType(ProductsActions.SET_PRODUCTS),
            take(1)
          );
        } else {
          return of(products);
        }
      })
    );
  }
}