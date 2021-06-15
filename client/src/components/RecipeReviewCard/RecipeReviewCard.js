import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import simpleImage from "../../assets/simpleImage.jpg";
import { useSelector, useDispatch } from "react-redux";
import { AuthStatus } from "../../redux/reducers/auth.reducer";
import { fetchApi } from "../../api/apiCall";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({
  name,
  description,
  nameAuthor,
  idRecipies,
  timeCreate,
  type,
  ingredients,
  dificulty,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const auth = useSelector((state) => state.Auth);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteItem = (id) => {
    console.log(id);
    fetchApi(`/delete/${id}`, { method: "DELETE" })
      .then((result) => window.location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nameAuthor.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={`Czas przygotowania ${timeCreate}`}
      />
      <CardMedia className={classes.media} image={simpleImage} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {`Skladniki: ${ingredients}`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography paragraph style={{ margin: "0px 5px" }}>
          {type}
        </Typography>
        <Typography paragraph style={{ margin: "0px  5px" }}>
          {dificulty}
        </Typography>
        {auth.status == AuthStatus.LOGGED_IN && (
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleDeleteItem(idRecipies)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Sposób wykonania:</Typography>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
