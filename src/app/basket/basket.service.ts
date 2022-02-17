import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { take } from "rxjs/operators";
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as AuthActions from "../auth/auth-store/auth.actions";
import * as ProductsActions from "../products/products-store/products.actions";

@Injectable({ providedIn: 'root' })
export class BasketService {
  constructor(
    private store: Store<fromAppReducer.AppState>,
  ) { }

  alreadyInBasket: boolean = false;
  basketCheck = new Subject<number | null>();

  getUserMail() {
    let userMail: string | null = null;
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        userMail = state.user.email;
      }
    });
    return userMail;
  }

  onAddToBasket(productId: number, price: number) {
    let userMail = this.getUserMail();

    if (userMail) {
      let alreadyInBasket: number | null = null;
      this.store.select('products').pipe(take(1)).subscribe(state => {
        state.basket.find(product => {
          if (product.productId === productId
            && product.userMail === userMail) {
            alreadyInBasket = productId;
            return;
          }
        });
      });

      if (alreadyInBasket) {
        if (this.alreadyInBasket) return;
        this.alreadyInBasket = true;
        this.basketCheck.next(alreadyInBasket);
        setTimeout(() => {
          this.alreadyInBasket = false;
          this.basketCheck.next(null);
        }, 2000);
        return;
      };

      this.store.dispatch(new ProductsActions.AddToBasket({
        productId, count: 1, price, userMail
      }));
    } else {
      this.store.dispatch(new AuthActions.TryToLogin(true));
    }
  }
}