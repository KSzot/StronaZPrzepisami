import { AuthActionType } from "../actions/auth.actions";
export const AuthStatus = {
  LOGOUTED: "LOGOUTED",
  LOGGED_IN: "LOGGED_IN",
};

const initialState = {
  status: AuthStatus.LOGOUTED,
  user: null,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AuthActionType.USER_LOGIN: {
      return {
        ...state,
        status: AuthStatus.LOGGED_IN,
        user: payload,
      };
    }
    case AuthActionType.REGISTER_USER:
      return state;

    case AuthActionType.USER_LOGOUT: {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export default AuthReducer;
