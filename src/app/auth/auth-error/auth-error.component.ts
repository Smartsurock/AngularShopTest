import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as AuthActions from '../auth-store/auth.actions';

@Component({
  selector: 'app-auth-error',
  templateUrl: './auth-error.component.html',
  styleUrls: ['./auth-error.component.scss']
})
export class AuthErrorComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  @Input() error: string;

  ngOnInit(): void {
  }

  resetError() {
    this.store.dispatch(new AuthActions.ClearError());
  }
}
