import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';
import * as AuthActions from './auth-store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  authForm: FormGroup;
  authSub: Subscription;
  loading: boolean = false;
  error: string = null;

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.error = state.error;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

  onLogin() {
    this.store.dispatch(new AuthActions.LoginStart({
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    }));
  }

  onSignUp() {
    this.store.dispatch(new AuthActions.SignUpStart({
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    }));
  }
}
