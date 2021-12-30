import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../auth/auth-store/auth.actions';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store<fromAppReducer.AppState>) { }

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
    this.loginStart.emit(true);
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onBasket() {
    if (!this.isLogged) {
      this.onLogin();
    }
  }

  onCatalog() {
    this.catalog.emit();
  }
}
