import { User } from "../user.model";
import * as AuthActoins from "./auth.actions";

export interface State {
  user: User;
  error: string;
  loading: boolean;
  logged: boolean;
  basketRedirect: boolean;
}

const initialState = {
  user: null,
  error: null,
  loading: false,
  logged: false,
  basketRedirect: false,
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

    case AuthActoins.LOGOUT:
      return {
        ...state,
        user: null,
        logged: false,
      }

    default: return state;
  }
}