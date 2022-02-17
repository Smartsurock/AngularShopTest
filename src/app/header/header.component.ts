import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AuthActions from '../auth/auth-store/auth.actions';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  @Output() loginStart = new EventEmitter<boolean>();
  isLogged: boolean = false;
  catalog: boolean = false;
  authSub: Subscription;

  ngOnInit() {
    this.authSub = this.store.select('auth').subscribe(state => {
      this.isLogged = state.logged;
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
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
  onDocumentClick(event: any) {
    if (event.target.closest('.header__catalog') !== this.catalogBtn.nativeElement) {
      this.catalog = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.catalog = false;
  }
}
