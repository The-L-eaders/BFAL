import React, { useState, useEffect, useContext } from "react";
import "./SASS/BiddingPage.scss";
import myCookie from "react-cookies";
import { If, Then, Else } from "react-if";
import superAgent from "superagent";
import { BiddingContext } from "../contaxt/biddingContext";
import { Link } from "react-router-dom";
// import useStyles from "./bidComp-style";
import { makeStyles } from "@material-ui/core";
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

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: "#ad1457",
      margin: 1,
    },
  }));

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

  // const container = document.querySelector(".container");
  // const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  // const count = document.getElementById("count");
  // const total = document.getElementById("total");
  // const movieSelect = document.getElementById("movie");

  // let ticketPrice = +movieSelect.value;

  // //save Selected movie index and price
  // function SelectedMovieData(movieIndex, moviePrice) {
  //   localStorage.setItem("selectedMovieIndex", movieIndex);
  //   localStorage.setItem("selectedMoviePrice", moviePrice);
  // }

  // //function update total and count
  // function updateSelectedCount() {
  //   const selectedSeats = document.querySelectorAll(".row .seat.selected");

  //   const seatsIndex = [...selectedSeats].map((seat) =>
  //     [...seats].indexOf(seat)
  //   );
  //   localStorage.setItem("selectesSeats", JSON.stringify(seatsIndex));

  //   const selectedSeatsCount = selectedSeats.length;
  //   count.innerText = selectedSeatsCount;
  //   total.innerText = selectedSeatsCount * ticketPrice;
  // }

  // //movie select event
  // movieSelect.addEventListener("change", (e) => {
  //   ticketPrice = +e.target.value;
  //   SelectedMovieData(e.target.selectedIndex, e.target.value);
  //   updateSelectedCount();
  // });

  // container.addEventListener("click", function (e) {
  //   if (
  //     e.target.classList.contains("seat") &&
  //     !e.target.classList.contains("occupied")
  //   ) {
  //     e.target.classList.toggle("selected");
  //     updateSelectedCount();
  //   }
  // });
  {
    /* <div class="movie-container">
  <label for="">Pick a movie</label>
  <select id="movie">
  <option value="10"> spiderman (10$) </option>
  <option value="12"> joker (12$)</option>
  <option value="9"> catch me if you can (9$)</option>
  <option value="8"> lborto9ala lmora (8$)</option>
  </select>
</div> */
  }

  // <div className="seats">
  // {totalUser.map((name) => {
  //   return (
  //     <div className="seat">
  //       <div className="joinedUser">
  //         {name}

  //         {showLatest.name === name ? (
  //           <img
  //             src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
  //             width="50px"
  //             height="50px"
  //           />
  //         ) : null}
  //       </div>
  //     </div>
  //   );
  // })}
  // </div>
  // ;
  // ) : {null}

  return (
    <div className="bg">
      {/* <ul class="showcase">
          <div class="seat"></div>
        <li>
          <small>N/A</small>
        </li>
        <li>
          <div class="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div class="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul> */}
      <div className="container bg">
        <div class="screen">
          <If condition={timer > 0}>
            <Then>
              <Card>
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
                      <input
                        type="hidden"
                        value={categoryInfo.timer}
                        id="timer"
                      />
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
                      No one Bided on this product, please come back agin on
                      another auction
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
        </div>
      </div>

      <div className="tableContainer">
        <div id="table-wrapper">
          <div class="chair left">
            <div className={totalUser[0] ? "show" : "hide"}>
              {totalUser[0]}
              {showLatest.name === totalUser[0] ? (
                <img
                  className="bidingSign"
                  src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
                  width="40px"
                  height="40px"
                />
              ) : null}
            </div>
          </div>

          <div class="chair left">
            <div className={totalUser[1] ? "show" : "hide"}>
              {totalUser[1]}
              {showLatest.name === totalUser[1] ? (
                <img
                  className="bidingSign"
                  src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
                  width="40px"
                  height="40px"
                />
              ) : null}
            </div>
          </div>

          <div class="chair right"></div>

          <div class="chair right"></div>

          <div class="the-table"></div>
        </div>

        <div id="table-wrapper">
          <div class="chair left">
            <div className={totalUser[3] ? "show" : "hide"}>
              {totalUser[3]}
              {showLatest.name === totalUser[3] ? (
                <img
                  className="bidingSign"
                  src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
                  width="40px"
                  height="40px"
                />
              ) : null}
            </div>
          </div>
          <div class="chair left">
            <div className={totalUser[2] ? "show" : "hide"}>
              {totalUser[2]}
              {showLatest.name === totalUser[2] ? (
                <img
                  className="bidingSign"
                  src="https://image.flaticon.com/icons/png/512/1543/1543570.png"
                  width="40px"
                  height="40px"
                />
              ) : null}
            </div>
          </div>
          <div class="chair right"></div>
          <div class="chair right"></div>
          <div class="the-table"></div>
        </div>

        <div id="table-wrapper">
          <div class="chair left"></div>
          <div class="chair left"></div>
          <div class="chair right"></div>
          <div class="chair right"></div>
          <div class="the-table"></div>
        </div>
      </div>
    </div>
  );
}

export default CarNameSpace;
