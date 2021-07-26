import React, { useState, useEffect } from "react";
import { CategoryHelper } from "../api/CategoryHelper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useHistory, useParams } from "react-router-dom";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import superAgent from "superagent";

import useStyles from "./Styles/CategoryStyles.js";


export default function RecipeReviewCard() {
  const history = useHistory();
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryHelper.list()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    superAgent
      .get("https://bid-fast-and-last.herokuapp.com/products")
      .then((data) => {
        setProduct(data.body);
      })
      .catch((e) => console.log(e));
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
                    image={row.img}
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
