import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthStatus } from "../../redux/reducers/auth.reducer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.Auth);
  console.log(auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.status !== AuthStatus.LOGGED_IN) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
