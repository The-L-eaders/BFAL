import React, { useState, useEffect } from "react";
import { CategoryHelper } from "../api/CategoryHelper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5%",
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "70%",
  },
  root: {
    margin: "auto",
    width: "40%",
  },
  media: {
    height: 150,
  },
  pageTitle: {
    marginTop: "10%",
    margin: "auto",
    textAlign: "center",
    fontSize: "2em",
  },
}));

export default function RecipeReviewCard() {
  const history = useHistory();
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryHelper.list()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {});
  }, []);

  function handleShowCategory(name) {
    history.push(`category-products/${name}`);
  }

  return (
    <div>
      <Typography className={classes.pageTitle}>
        Categories available are car and house,
        <br /> once you click on any of them you will see the current product in
        the queue for that category.
      </Typography>
      <div className={classes.container}>
        {categories &&
          categories.map((row, i) => {
            return (
              <Card
                key={i}
                className={classes.root}
                onClick={() => handleShowCategory(row.name)}
              >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <CardHeader title={row.name} />
                  </CardContent>
                </CardActionArea>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
