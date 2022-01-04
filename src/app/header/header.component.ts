import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth-store/auth.actions';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  searchForm: FormGroup;
  @Output() loginStart = new EventEmitter<boolean>();
  @Output() catalog = new EventEmitter<boolean>();
  isLogged: boolean = false;

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });

    this.store.select('auth').subscribe(state => {
      this.isLogged = state.logged;
    });
  }

  onSubmit() {

  }

  onLogin() {
    // this.loginStart.emit(true);
    this.store.dispatch(new AuthActions.TryToLogin(true));
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onBasket() {
    if (!this.isLogged) {
      this.onLogin();
      this.store.dispatch(new AuthActions.BasketRedirect(true));
    } else {
      this.router.navigate(['basket']);
    }
  }

  onCatalog() {
    this.catalog.emit();
  }
}
