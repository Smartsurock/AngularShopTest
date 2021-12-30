import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";
import * as fromAppReducer from "../store/app.reducer";
import * as AuthActions from "./auth-store/auth.actions";

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  tokenValidTimer: any = null;

  setTokenValidTimer(expiration: number) {
    this.tokenValidTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expiration);
  }

  clearTokenValidTimer() {
    if (this.tokenValidTimer) {
      clearTimeout(this.tokenValidTimer);
    }
    this.tokenValidTimer = null;
  }

  basketRedirect() {
    let goToBasket: boolean;
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      goToBasket = state.basketRedirect;
    });

    if (goToBasket) {
      this.router.navigate(['basket']);
      this.store.dispatch(new AuthActions.BasketRedirect(false));
    }
  }
}