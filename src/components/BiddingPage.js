import React, { useState, useEffect, useContext } from "react";
import "./SASS/BiddingPage.scss";
import myCookie from "react-cookies";
import { If, Then, Else } from "react-if";
import superAgent from "superagent";
import { BiddingContext } from "../contaxt/biddingContext";
import { Link } from "react-router-dom";
import useStyles from "./bidComp-style";
import Timer from "@material-ui/icons/Timer";
import { useParams, useHistory } from "react-router-dom";
import { CategoryHelper } from "../api/CategoryHelper";
import socketIOClient from "socket.io-client";

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

// const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

function CarNameSpace() {
  const history = useHistory();
  const { name } = useParams();
  const [categoryInfo, setCategoryInto] = useState({});
  const ENDPOINT = `https://bid-fast-and-last.herokuapp.com/${name}`;
  const socket = socketIOClient(ENDPOINT);
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
    socket.emit("newUser", { token: myCookie.load("token") });

    if (!name) {
      history.push("/category");
      return;
    }
    CategoryHelper.getAuction(name)
      .then((response) => {
        response.data.data
          ? setCategoryInto(response.data.data)
          : setCategoryInto({});
        setLastPrice(response.data.data.startingPrice);
        setTimer(response.data.data.timer);
      })
      .catch((err) => {
        setCategoryInto({});
      });

    socket.on("greeting", (data) => {
      setGreeting(data);
    });

    socket.on("showLatest", (total) => {
      // setLastPrice(total.total)
      setShowLatest({
        name: total.name,
        total: total.total,
      });
    });

    socket.on("users", (allUsers) => {
      console.log(allUsers);
      setTotalUser([...allUsers]);
    });

    socket.on("liveBid", (latest) => {
      if (latest === 0 || latest === null) {
        latest = lastPrice;
      } else {
        setLastPrice(latest);
      }
    });

    socket.on("liveCounter", (data) => {
      setTimer(data);
    });
  }, []);



  const classes = useStyles();

  const handelClick = () => {
    socket.emit("startBidding", {
      counter: 15,
      lastPrice: categoryInfo.startingPrice,
      text: myCookie.load("token"),
    });
  };

  const addMoneyHandler = (value) => {
    const x = lastPrice + parseInt(value);
    setLastPrice(x);
    socket.emit("increasePrice", {
      lastPrice: x,
      token: myCookie.load("token"),
      userName: myCookie.load("userName"),
    });
  };

  const showHandler = () => {
    setShowLatest({});
  };

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

  return categoryInfo.category ? (
    <>
      <If condition={timer > 0}>
        <Then>
          <Card className={classes.card}>
            <CardHeader title={categoryInfo.productName} />
            <CardContent>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={6} md={4}>
                  <img
                    width="400"
                    src={categoryInfo.productImage}
                    onClick={handelClick}
                  />
                  <input
                    type="hidden"
                    value={categoryInfo.startingPrice}
                    id="startingPrice"
                  />
                  <input type="hidden" value={categoryInfo.timer} id="timer" />
                  <p id="Description">{categoryInfo.productDis}</p>
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
                  {`Congrats for ${showLatest.name}, you have bought this Product for ${showLatest.total}$`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  onClick={showHandler}
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
                No one Bided !!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  No one Bided on this product, please come back agin on another
                  auction
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  onClick={showHandler}
                >
                  Back
                </Button>
              </DialogActions>
            </Dialog>
          </Then>
        </If>
      </Else>
      <div className="seats">
        {totalUser.map((name) => {
          return (
            <div className="seat">
              <div className="joinedUser">
                {name}

                {showLatest.name === name ? (
                  <img
                    src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
                    width="50px"
                    height="50px"
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
      ;
    </>
  ) : null;
}

export default CarNameSpace;
