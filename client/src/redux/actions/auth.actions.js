import { fetchApi } from "../../api/apiCall";
export const AuthActionType = {
  USER_LOGIN: "USER_LOGIN",
  REGISTER_USER: "REGISTER_USER",
  USER_LOGOUT: "USER_LOGOUT",
};

export const AuthActions = {
  login,
  logout,
};

function login(user, cb) {
  return (dispatch) => {
    fetchApi("/login", { method: "POST", body: user })
      .then((result) => {
        console.log(result);
        dispatch({
          type: AuthActionType.USER_LOGIN,
          payload: result,
        });
        cb();
      })
      .catch((err) => console.log(err));
  };
}

function logout() {
  return (dispatch) => {
    dispatch({
      type: AuthActionType.USER_LOGOUT,
    });
  };
}
