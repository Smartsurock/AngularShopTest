import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";
import { of } from "rxjs";
import { User } from "../user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) { }

  @Effect()
  authSignUp = this.actions.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap((signUpAction: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIkey}`, {
        email: signUpAction.payload.email,
        password: signUpAction.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(response => {
          this.authService.setTokenValidTimer(+response.expiresIn * 1000);
        }),
        map((response: AuthResponseData) => {
          return hendleAuthentication(response);
        }),
        catchError(error => {
          return hendleError(error);
        })
      )
    })
  );

  @Effect()
  authLogin = this.actions.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((loginAction: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIkey}`, {
        email: loginAction.payload.email,
        password: loginAction.payload.password,
        returnSecureToken: true
      }).pipe(
        tap(response => {
          this.authService.setTokenValidTimer(+response.expiresIn * 1000);
        }),
        map((response: AuthResponseData) => {
          return hendleAuthentication(response);
        }),
        catchError(error => {
          return hendleError(error);
        })
      )
    })
  );

  @Effect({ dispatch: false })
  logout = this.actions.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('user');
      this.authService.clearTokenValidTimer();
    })
  );

  @Effect({ dispatch: false })
  basketRedirect = this.actions.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => {
      this.authService.basketRedirect();
    })
  );

  @Effect()
  autoLogin = this.actions.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const user: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date,
      } = JSON.parse(localStorage.getItem('user'));

      if (!user) {
        return { type: "Непонятный эрор!" };
      }

      const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate));

      if (loadedUser.token) {
        const expirationDate = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setTokenValidTimer(expirationDate);

        return new AuthActions.AuthSuccess(loadedUser);
      }

      return { type: "Непонятный эрор!" };
    })
  );
}

function hendleAuthentication(response) {
  const expiration = new Date(new Date().getTime() + response.expiresIn * 1000);
  const user = new User(response.email, response.localId, response.idToken, expiration);
  localStorage.setItem("user", JSON.stringify(user));

  return new AuthActions.AuthSuccess(user);
}

function hendleError(error) {
  let errorMessage = "Непонятный эрор!";

  if (!error.error || !error.error.error) {
    return of(new AuthActions.AuthFail(errorMessage));
  }

  switch (error.error.error.message) {
    case 'EMAIL_EXISTS': errorMessage = "Это мыло уже занято!";
      break;
    case 'OPERATION_NOT_ALLOWED': errorMessage = "Регистрация не завершена, обратитесь через несколько лет!";
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': errorMessage = "Хз чё ты тут наклацал, но придёться подождать... недельку...!";
      break;
    case 'EMAIL_NOT_FOUND': errorMessage = "Нет такого мыла!";
      break;
    case 'INVALID_PASSWORD': errorMessage = "Инвалидный пароль!";
      break;
    case 'USER_DISABLED': errorMessage = "Админ тебя кикнул нахуй!";
      break;
    default: errorMessage;
  }

  return of(new AuthActions.AuthFail(errorMessage));
}