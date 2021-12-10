import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const SIGN_UP_START = "SIGN_UP_START";
export const LOGIN_START = "LOGIN_START";
export const LOGOUT = "LOGOUT";
export const AUTH_FAIL = "AUTH_FAIL";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const AUTO_LOGIN = "AUTO_LOGIN";

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: User) { }
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) { }
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | ClearError
  | AutoLogin
  | AuthFail
  | LoginStart
  | Logout
  | SignUpStart
  | AuthSuccess;