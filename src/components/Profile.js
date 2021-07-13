import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Typography from "@material-ui/core/Typography";
import myCookie from "react-cookies";
import { Paper } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import superAgent from "superagent";
const useStyles = makeStyles((theme) => ({
  addCircle: {
    marginTop: 90,
    marginLeft: 50,
    fontSize: 50,
    backgroundColor: "#ad1457",
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    display: "flex",
    justifyContent: "center",
  },

  root: {
    display: "block",
    marginLeft: 70,
    width: "80%",
  },

  card: {
    boxShadow: ` 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048),
        0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 50px 80px rgba(0, 0, 0, 0.12)`,
    marginTop: 2,
    marginBottom: "2%",
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    margin: "auto",
    backgroundColor: "#F0F0F0",
  },

  UserCard: {
    margin: "auto",
    marginTop: 150,
    textAlign: "center",
    width: "90%",
    padding: "1%",
    backgroundColor: "#F0F0F0",
  },

  heading: {
    boxShadow: `0 20px 20px rgba(0, 0, 0, 0.12)`,
    fontSize: theme.typography.pxToRem(20),
    backgroundColor: "#FCECF1",
  },

  innerRoot: {
    margin: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    width: "40%",
    textAlign: "center",
  },

  text1: {
    fontSize: "15px",
    margin: "auto",
    textAlign: "center",
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
            <Paper elevation={6} className={style.UserCard}>
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
                      <div className={style.innerRoot}>
                        <Accordion>
                          <AccordionSummary
                            className={style.heading}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <img
                              src={product.productImage}
                              width="200"
                              height="200"
                            />

                            <Typography
                              variant="p"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Product Name
                              <hr />
                              {product.productName}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Product's Status: &nbsp; {product.status}
                              <hr />
                              Product Starting Price: &nbsp;
                              {product.startingPrice}$
                              <hr />
                              Product Description: &nbsp;
                              {product.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })
                : user.cart.map((product) => {
                    return (
                      <div className={style.innerRoot}>
                        <Accordion>
                          <AccordionSummary
                            className={style.heading}
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <img
                              src={product.productImage}
                              width="200"
                              height="200"
                            />

                            <Typography
                              variant="p"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Product Name
                              <hr />
                              {product.productName}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Product's Status: &nbsp; {product.status}
                              <hr />
                              Product Starting Price: &nbsp;
                              {product.startingPrice}$
                              <hr />
                              Product Description: &nbsp;
                              {product.description}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}{" "}
            </Card>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
}

export default Profile;
