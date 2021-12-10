import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAppReducer from "../store/app.reducer";
import * as AuthActions from "./auth-store/auth.actions";

@Injectable({ providedIn: 'root' })
export class LogoutService {
  constructor(private store: Store<fromAppReducer.AppState>) { }

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
}