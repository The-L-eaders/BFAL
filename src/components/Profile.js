import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Typography from "@material-ui/core/Typography";
import myCookie from "react-cookies";
import { Paper } from "@material-ui/core";

import superAgent from "superagent";
const useStyles = makeStyles((theme) => ({
  addCircle: {
    marginTop: 80,
    marginLeft: 60,
    fontSize: 50,
    backgroundColor: "#ad1457",
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    display: "flex",
    justifyContent: "center",
  },
  text: {},
  text1: {
    fontSize: "1em",
  },
  root: {
    display: "block",
    marginLeft: 70,
    width: "100%",
  },

  card: {
    boxShadow: ` 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 50px 80px rgba(0, 0, 0, 0.12)`,
    borderRadius: "10px",
    border: "1px solid gray",
    backgroundColor: "#EFEFEF",
    borderBlockColor: "#3f51b5",
    marginTop: 2,
    maxHeight: 550,
    marginBottom: "2%",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
    margin: "auto",
  },

  UserCard: {
    margin: "auto",
    marginTop: 120,
    textAlign: "center",
    width: 450,
    padding: "2%",
  },

  products: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "2%",
    marginTop: "2%",
    padding: "10px",
    width: "25%",
    textAlign: "center",
    borderRadius: "20px",
  },
}));

function Profile() {
  const style = useStyles();
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    superAgent
      .post("https://bid-fast-and-last.herokuapp.com/getUser")
      .send({ token: myCookie.load("token") })
      .then((data) => {
        setUser(data.body);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      {user.userName ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <div className={style.addCircle}>
              <p className={style.text}>{user.userName}</p>
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Paper elevation={10} className={style.UserCard}>
              <Typography variant="h6" color="textSecondary">
                User Name: {user.userName}
              </Typography>
              <Typography variant="h5" color="textSecondary">
                Email: {user.email}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={2}>
            <div className={style.root}>
              <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical contained primary button group"
                variant="text"
              >
                <Button onClick={() => setFlag(true)}>
                  My Products ( {user.product.length} )
                </Button>
                <Button
                  onClick={() => setFlag(false)}
                  startIcon={<AddShoppingCartIcon />}
                >
                  My Cart ( {user.cart.length} )
                </Button>
              </ButtonGroup>
            </div>
          </Grid>

          <Grid item xs={12} sm={9}>
            <Card className={style.card}>
              {flag && user.product.length
                ? user.product.map((product) => {
                    return (
                      <Card className={style.products}>
                        <CardMedia image={product.productImage} />
                        <img
                          src={product.productImage}
                          width="200"
                          height="200"
                        />
                        <Typography
                          variant="h5"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product Name: {product.productName}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product Starting Price: {product.startingPrice}$
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product's Status: {product.status}$
                        </Typography>
                      </Card>
                    );
                  })
                : user.cart.length
                ? user.cart.map((product) => {
                    return (
                      <Card className={style.products}>
                        <CardMedia image={product.image} />
                        <img
                          src={product.productImage}
                          width="200"
                          height="200"
                          marginTop="20px"
                        />
                        <Typography
                          variant="h5"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product Name :{product.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product Price :{product.price}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="textSecondary"
                          className={style.text1}
                        >
                          Product Description :{product.description}
                        </Typography>
                      </Card>
                    );
                  })
                : null}
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

export default Profile;
