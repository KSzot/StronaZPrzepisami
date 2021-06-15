import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import "../Register/Register.css";
import Typography from "@material-ui/core/Typography";
import { fetchApi } from "../../api/apiCall";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "../../redux/actions/auth.actions";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180,
    },
  },
}));
const Login = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(AuthActions.login(data, () => history.push("/")));
  };
  console.log(errors.password);
  return (
    <React.Fragment>
      <Typography align={"center"}>Logowanie</Typography>

      <form
        className="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          error={errors.email ? true : false}
          id="standard-basic"
          label="Email"
          {...register("email", { required: true })}
          helperText={errors.email ? "Pole jest wymagane" : ""}
        />
        <TextField
          error={errors.password ? true : false}
          id="standard-basic"
          label="Hasło"
          {...register("password", { required: true })}
          helperText={errors.password ? "Pole jest wymagane" : ""}
        />
        <Button variant="outlined" color="primary" type="submit">
          Zaloguj
        </Button>
      </form>
    </React.Fragment>
  );
};

export default Login;
