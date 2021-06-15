import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "./Create.css";
import { fetchApi } from "../../api/apiCall";
import { useHistory } from "react-router-dom";
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
const Create = (props) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    fetchApi("/create", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log(result);
        history.push("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <form
      className="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        error={errors.name ? true : false}
        id="standard-basic"
        label="Nazwa potrawy"
        {...register("name", { required: true })}
        helperText={errors.name ? "Pole jest wymagane" : ""}
      />
      <TextField
        error={errors.nameAuthor ? true : false}
        id="standard-basic"
        label="Imię autora"
        {...register("nameAuthor", { required: true })}
        helperText={errors.nameAuthor ? "Pole jest wymagane" : ""}
      />
      <TextField
        error={errors.timeCreate ? true : false}
        id="standard-basic"
        label="Czas przygotowania"
        {...register("timeCreate", { required: true })}
        helperText={errors.timeCreate ? "Pole jest wymagane" : ""}
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Typ potrawy</InputLabel>
        <Select
          native
          error={errors.type ? true : false}
          value={getValues("type")}
          {...register("type", { required: true })}
          helperText={errors.type ? "Pole jest wymagane" : ""}
        >
          <option aria-label="None" value="" />
          <option value={"Śniadania"}>Śniadania</option>
          <option value={"Obiad"}>Obiad</option>
          <option value={"Przystawka"}>Przystawka</option>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Wybierz trudność</InputLabel>
        <Select
          native
          error={errors.dificulty ? true : false}
          value={getValues("dificulty")}
          helperText={errors.dificulty ? "Pole jest wymagane" : ""}
          {...register("dificulty", { required: true })}
        >
          <option aria-label="None" value="" />
          <option value={"Latwy"}>Latwy</option>
          <option value={"Normalny"}>Normalny</option>
          <option value={"Trudny"}>Trudny</option>
        </Select>
      </FormControl>
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={5}
        placeholder="Opis"
        helperText={errors.text ? "Pole jest wymagane" : ""}
        {...register("text", { required: true })}
        error={errors.text ? true : false}
      />
      <TextareaAutosize
        aria-label="minimum height"
        rowsMin={3}
        placeholder="Składniki"
        helperText={errors.ingredients ? "Pole jest wymagane" : ""}
        {...register("ingredients", { required: true })}
        error={errors.ingredients ? true : false}
      />
      <div style={{ flexBasis: "60%" }}></div>
      <Button variant="outlined" color="primary" type="submit">
        Zapisz
      </Button>
    </form>
  );
};

export default Create;
