import React, { useState, useEffect } from "react";
import { CategoryHelper } from "../api/CategoryHelper";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: "pointer",
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
    backgroundColor: "red",
  },
}));

export default function RecipeReviewCard() {
  const history = useHistory();
  const classes = useStyles();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryHelper.list().then((response) => {
      setCategories(response.data);
    }).catch((err) => {

    })
  }, [])

  function handleShowCategory(name) {
    history.push(`category-products/${name}`);
  }


  return (
    <div>
      {categories && categories.map((row, i) => {
        return (
          <Card key={i} className={classes.root} onClick={() => handleShowCategory(row.name)}>
            <CardHeader
              title={row.name}
            />
          </Card>
        )
      })}
    </div>
  );
}
