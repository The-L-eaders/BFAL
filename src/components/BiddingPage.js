import React, { useState, useEffect, useContext } from "react";
import myCookie from "react-cookies";
import { If, Then, Else } from "react-if";
import superAgent from "superagent";
import { BiddingContext } from "../contaxt/biddingContext";
import { socket } from "../contaxt/biddingContext";
import { Link } from "react-router-dom";
import useStyles from "./bidComp-style";
import Timer from "@material-ui/icons/Timer";

import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";

const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

function CarNameSpace() {
  const classes = useStyles();
  const {
    product,
    setProduct,
    timer,
    setTimer,
    lastPrice,
    setLastPrice,
    greeting,
    setGreeting,
    showLatest,
    setShowLatest,
    totalUser,
    setTotalUser,
  } = useContext(BiddingContext);

  useEffect(() => {
    superAgent
      .get(ENDPOINT)
      .set(`Authorization`, `Bearer ${myCookie.load("token")}`)
      .then((data) => {
        console.log(data.body.data);
        setProduct(data.body.data);
        if (data.body.data) {
          setTimer(data.body.data.timer);
          setLastPrice(data.body.data.startingPrice);
        }
      })
      .catch((e) => console.log(e.message, "-------e"));
    socket.emit("newUser", { token: myCookie.load("token") });
  }, []);

  // let totalUser=[];

  socket.on("greeting", (data) => {
    if (!totalUser.includes(data)) {
      // totalUser.push(data)
      setTotalUser([...totalUser, data]);
    }
    console.log(totalUser, ".............");
    setGreeting(data);
  });
  const handelClick = () => {
    socket.emit("startBidding", {
      counter: 15,
      lastPrice: product.startingPrice,
      text: myCookie.load("token"),
    });
    console.log("startBidding");
  };

  const addMoneyHandler = (value) => {
    const x = lastPrice + parseInt(value);
    setLastPrice(x);
    socket.emit("increasePrice", {
      lastPrice: lastPrice,
      token: myCookie.load("token"),
    });
    console.log("increasePrice");
  };

  socket.on("showLatest", (total) => {
    console.log(total, "?????????");
    // setLastPrice(total.total)
    setShowLatest({
      name: total.name,
      total: total.total,
    });
  });

  // socket.on("liveBid", (latest) => {
  //   console.log(latest, lastPrice , '???????????');
  //   if (latest === 0 || latest === null) {
  //     latest = lastPrice;
  //   } else {
  //     setLastPrice(latest)
  //   }
  // });

  function format(time) {
    // Hours, minutes and seconds
    let hrs = ~~(time / 3600);
    let mins = ~~((time % 3600) / 60);
    let secs = ~~time % 60;
    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";
    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  }
  socket.on("liveCounter", (data) => {
    setTimer(data);
  });

  // 3ebra //
  // socket.on("try", (data) => {
  //   if (
  //     data.lastToken == myCookie.load("token") ||
  //     data.lastTokenHouse == myCookie.load("token")
  //   ) {
  //     socket.emit("sold", data);
  //   }
  // });

  return product ? (
    <>
      <If condition={timer > 0}>
        {/* {console.log(timer)} */}
        <Then>
          <Card className={classes.card}>
            <CardHeader title={product.productName} />
            <CardContent>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={6} md={4}>
                  <img
                    width="400"
                    src={product.productImage}
                    onClick={handelClick}
                  />
                  <input
                    type="hidden"
                    value={product.startingPrice}
                    id="startingPrice"
                  />
                  <input type="hidden" value={product.timer} id="timer" />
                  <p id="Description">{product.productDis}</p>
                  <CardActions disableSpacing className={classes.buttons}>
                    <Box>
                      <Button
                        variant="contained"
                        id="addFive"
                        className={classes.button}
                        onClick={() => {
                          addMoneyHandler(500);
                        }}
                      >
                        500$
                      </Button>
                      <Button
                        variant="contained"
                        id="addTen"
                        className={classes.button}
                        onClick={() => {
                          addMoneyHandler(1000);
                        }}
                      >
                        1000$
                      </Button>
                      <Button
                        variant="contained"
                        id="addTwen"
                        className={classes.button}
                        onClick={() => {
                          addMoneyHandler(2000);
                        }}
                      >
                        2000$
                      </Button>
                    </Box>
                  </CardActions>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <h2>greeting : {greeting}</h2>
                  <h4>
                    showLatest : {showLatest.name} {showLatest.total}
                  </h4>
                  <h5>lastPrice : {lastPrice}</h5>
                  <input id="productId" value={product._id} type="hidden" />
                  <Typography className={classes.time} color="secondary">
                    {" "}
                    {format(timer)}{" "}
                    <Timer className={classes.timer} color="secondary" />{" "}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Then>
      </If>
      <Else>
        <If
          condition={timer === 0}
          condition={Object.keys(showLatest).length && timer === 0}
        >
          <Then>
            <Dialog
              fullWidth={true}
              maxWidth="sm"
              open={open}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                congratulations !!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {`congratulations for ${showLatest.name} you have bought this Product By ${showLatest.total} `}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </Then>
        </If>
      </Else>
      <Else>
        <If
          condition={timer === 0}
          condition={!Object.keys(showLatest).length && timer === 0}
        >
          <Then>
            <Dialog
              fullWidth={true}
              maxWidth="sm"
              open={open}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">
                No one Bidded !!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  No one Bidded on this product, please come back agin on
                  another auction
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                >
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </Then>
        </If>
      </Else>
    </>
  ) : null;
}

export default CarNameSpace;
