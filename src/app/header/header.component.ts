import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
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
  isLogged: boolean = false;
  catalog: boolean = false;

  ngOnInit() {
    this.searchForm = new FormGroup({
      search: new FormControl(null),
    });

    this.store.select('auth').subscribe(state => {
      this.isLogged = state.logged;
    });
  }

  onSubmit() {
    if (!this.searchForm.value.search || !this.searchForm.value.search.trim()) {
      this.searchForm.reset();
      return;
    }

    this.router.navigate(['search',
      { title: this.searchForm.value.search.trim() }
    ]);

    this.searchForm.reset();
  }

  onLogin() {
    this.store.dispatch(new AuthActions.TryToLogin(true));
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onBasket() {
    if (!this.isLogged) {
      this.store.dispatch(new AuthActions.BasketRedirect(true));
      this.onLogin();
    } else {
      this.router.navigate(['basket']);
    }
  }

  onCatalog() {
    this.catalog = !this.catalog;
  }

  @ViewChild('catalogBtn') catalogBtn: ElementRef;

  @HostListener("document:click", ['$event'])
  onDocumentClick(event) {
    if (event.target != this.catalogBtn.nativeElement) {
      this.catalog = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.catalog = false;
  }
}
