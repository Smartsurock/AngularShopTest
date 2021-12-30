import { Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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
  @Output() loginStart = new EventEmitter<boolean>();
  @ViewChild('container') container: ElementRef;
  @ViewChild('form') form: ElementRef;

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.loginStart.emit(false);
      }
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

  @HostListener('document:click', ['$event'])
  onLoginEscape(event) {
    if (this.container.nativeElement.contains(event.target) &&
      !this.form.nativeElement.contains(event.target)) {
      this.loginStart.emit(false);
    }
  }
}
