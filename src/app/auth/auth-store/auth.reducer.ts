import { User } from "../user.model";
import * as AuthActoins from "./auth.actions";

export interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
  logged: boolean;
  basketRedirect: boolean;
  tryToLogin: boolean;
}

const initialState: State = {
  user: null,
  error: null,
  loading: false,
  logged: false,
  basketRedirect: false,
  tryToLogin: false,
}

export function authReducer(
  state: State = initialState, action: AuthActoins.AuthActions
) {
  switch (action.type) {
    case AuthActoins.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        loading: false,
        logged: true,
        tryToLogin: false,
      }

    case AuthActoins.BASKET_REDIRECT:
      return {
        ...state,
        basketRedirect: action.payload,
      }

    case AuthActoins.LOGIN_START:
    case AuthActoins.LOGIN_START:
      return {
        ...state,
        error: null,
        loading: true,
      }

    case AuthActoins.TRY_TO_LOGIN:
      return {
        ...state,
        tryToLogin: action.payload,
      }

    case AuthActoins.LOGOUT:
      return {
        ...state,
        user: null,
        logged: false,
      }

    case AuthActoins.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case AuthActoins.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }

    default: return state;
  }
}