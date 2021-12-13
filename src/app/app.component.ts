import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appAnimation } from './app.animation';
import * as AuthActions from './auth/auth-store/auth.actions';
import * as fromAppReducer from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

  loginStart: boolean = false;
  catalog: boolean = false;

  ngOnInit() {
    this.store.dispatch(new AuthActions.AutoLogin());
  }

  onLoginStart(value: boolean) {
    this.loginStart = value;
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape() {
    this.loginStart = false;
    this.catalog = false;
  }

  onCatalogClick() {
    this.catalog = !this.catalog;
  }
}
