import React, { useState, useEffect } from "react";
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
import useStyles from "./Styles/ProfileStyles.js";



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
                ? user.product.map((product,idx) => {
                    return (
                      <div className={style.innerRoot} key={idx}>
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
                              variant="inherit"
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
                            <img src={product.image} width="200" height="200" />

                            <Typography
                              variant="inherit"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Product Name
                              <hr />
                              {product.name}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails>
                            <Typography
                              variant="h6"
                              color="textSecondary"
                              className={style.text1}
                            >
                              Bought with: &nbsp; {product.price}
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
