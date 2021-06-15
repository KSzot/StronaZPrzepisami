import React, { useEffect, useState } from "react";
import { RecipeReviewCard } from "../../components";
import { fetchApi } from "../../api/apiCall";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";

const typeMeals = [
  {
    value: "none",
    label: "",
  },
  {
    value: "Śniadania",
    label: "Śniadania",
  },
  {
    value: "Obiad",
    label: "Obiad",
  },
  {
    value: "Przystawka",
    label: "Przystawki",
  },
];

const dificult = [
  {
    value: "none",
    label: "",
  },
  {
    value: "Latwy",
    label: "Łatwo",
  },
  {
    value: "Normalny",
    label: "Normalnie",
  },
  {
    value: "Trudny",
    label: "Trudno",
  },
];
const Home = (props) => {
  const [recipies, setRecipies] = useState([]);
  const [typeMeal, setTypeMeal] = useState(null);
  const [levelDificult, setLevelDificult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.Auth);
  useEffect(() => {
    setIsLoading(true);
    fetchApi("/recipies", { method: "GET" })
      .then((result) => {
        console.log(result);
        setRecipies(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleTypeMeal = (event) => {
    const filter = event.target.value;
    setTypeMeal(filter);
    if (filter == "none") {
      fetchApi("/recipies", { method: "GET" })
        .then((result) => {
          setRecipies(result);
        })
        .catch((error) => console.log(error));
    } else {
      fetchApi("/recipies", { method: "GET" })
        .then((result) => {
          const newArray = result.filter((item) => item.type == filter);
          setRecipies(newArray);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDificult = (event) => {
    const filter = event.target.value;
    setLevelDificult(filter);
    if (filter == "none") {
      fetchApi("/recipies", { method: "GET" })
        .then((result) => {
          setRecipies(result);
        })
        .catch((error) => console.log(error));
    } else {
      fetchApi("/recipies", { method: "GET" })
        .then((result) => {
          const newArray = result.filter((item) => item.dificulty == filter);
          setRecipies(newArray);
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(auth);
  return (
    <React.Fragment>
      {isLoading == true ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <React.Fragment>
          {recipies.length == 0 && (
            <Typography align={"center"}>
              Brak przepisów. Bądz pierwszy
            </Typography>
          )}
          {recipies.length > 0 && (
            <div style={{ margin: "5px 0", display: "flex" }}>
              <TextField
                id="filled-select-currency"
                select
                label="Wybierz"
                value={typeMeal}
                onChange={handleTypeMeal}
                helperText="Filtruj po"
                variant="filled"
              >
                {typeMeals.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                style={{ marginLeft: "10px" }}
                id="filled-select-currency"
                select
                label="Wybierz"
                value={levelDificult}
                onChange={handleDificult}
                helperText="Trudność wykonania"
                variant="filled"
              >
                {dificult.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          )}
          <div className="HomeContainer">
            {recipies.map((item, index) => (
              <RecipeReviewCard
                key={`${index}${item.name}`}
                name={item.name}
                description={item.text}
                nameAuthor={item.nameAuthor}
                idRecipies={item.id_recipies}
                timeCreate={item.timeCreate}
                type={item.type}
                ingredients={item.ingredients}
                dificulty={item.dificulty}
              />
            ))}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Home;
