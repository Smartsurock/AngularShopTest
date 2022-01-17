import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { appAnimation } from './app.animation';
import * as AuthActions from './auth/auth-store/auth.actions';
import * as fromAppReducer from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  loginStart: boolean = false;
  authSub: Subscription;

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
    this.authSub = this.store.select('auth').subscribe(state => {
      this.loginStart = state.tryToLogin;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
