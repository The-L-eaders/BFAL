import React, { useState, useEffect } from "react";
import { CategoryHelper } from "../api/CategoryHelper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import superAgent from "superagent";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import "./SASS/slider.scss";
import { width } from "@material-ui/system";

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
    marginTop: '0'
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
  const [product, setProduct] = useState([])
  const [current, setCurrent] = useState(0)
  const length = product.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  useEffect(() => {
    CategoryHelper.list()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => { console.log(err.message) });
 
    superAgent
      .get("https://bid-fast-and-last.herokuapp.com/products")
      .then((data) => {
        setProduct(data.body);
        console.log(data.body);
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
      <div className='slider'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {product.length? product.map((slide, index) => {
          return (
            <>
              <div className={index === current ? 'slide active' : 'slide'} key={index}>

                {index === current && (
                  <img src={slide.productImage} alt='product-image' className='image' />
                )}
              </div>
            </>
          )
        }):<h1>No Product in DB</h1>}
      </div>
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
