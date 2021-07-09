import React, { useState, useEffect, useContext } from "react";
import myCookie from "react-cookies";
import { If, Then, Else} from 'react-if';
import superAgent from "superagent";
import { BiddingContext } from "../contaxt/biddingContext";
import { socket } from "../contaxt/biddingContext";
import {Link} from 'react-router-dom';
import useStyles from "./bidComp-style";
import Timer from "@material-ui/icons/Timer";

import { Dialog,
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
} from '@material-ui/core'



const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";


function CarNameSpace() {
  const [expanded, setExpanded] = React.useState(false);
  const [falg,setFlag] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  } = useContext(BiddingContext);


  useEffect(() => {
    setFlag(true)
    superAgent
      .get(ENDPOINT)
      .set(`Authorization`, `Bearer ${myCookie.load("token")}`)
      .then((data) => {
        console.log(data.body.data,);
        setProduct(data.body.data);
        if (data.body.data) {
          setTimer(data.body.data.timer);
          setLastPrice(data.body.data.startingPrice);
        }
      })
      .catch((e) => console.log(e.message, "-------e"));
  }, []);



  socket.emit("newUser", { token: myCookie.load("token") });
  socket.on("greeting", (data) => {
    setGreeting(data);
  });
//الفلاق حل مؤقت ...لازم ال
//  ينعمل ممن الباكيند startBidding 

  const handelClick = () => {
    console.log(falg);
    if (falg) {
      setFlag(false)
      socket.emit("startBidding", {
        counter: 15,
        lastPrice: product.startingPrice,
        text: myCookie.load("token"),
      });
      console.log("startBidding");
    }
  };

  const addMoneyHandler = (e) => {
    const x = lastPrice + parseInt(e.target.value);
    setLastPrice(x);
    socket.emit("increasePrice", {
      lastPrice: lastPrice,
      token: myCookie.load("token"),
    });
    console.log("increasePrice");
  };

  socket.on("showLatest", (total) => {
    setShowLatest({
      name: total.name,
      total: total.total,
    });
  });

  // socket.on("liveBid", (latest) => {
  //   // if (latest === 0 || latest === null) {
  //     // latest = lastPrice;
  //   //   null;
  //   // } else {
  //     setLastPrice(latest)
  //   // }
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
     <If condition={timer>0}>
    {/* {console.log(timer)} */}
       <Then>
       <Card className={classes.card}>
      <CardHeader title={product.productName}/>
      <CardContent>
        <Grid container spacing={2}  justifyContent='space-between'>
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
            <p id="Description">
              {product.productDis}
            </p>
            <CardActions disableSpacing className={classes.buttons}>
            <Box >
              <button variant='contained'
                id="addFive"
                 className={classes.button}
                value="500"
                onClick={addMoneyHandler}
              >
                500$
              </button>
              <button variant='contained'
                id="addTen"
                 className={classes.button}
                value="1000"
                onClick={addMoneyHandler}
              >
                1000$
              </button >
              <button variant='contained'
                id="addTwen"
                 className={classes.button}
                value="2000"
                onClick={addMoneyHandler}
              >
                2000$
              </button >
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
              <p className={classes.time}>  {  format(  timer)  } <Timer className={classes.timer}/> </p>
            </Grid>
        </Grid>
        
      </CardContent>
      
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>text description</Typography>
          <Typography paragraph>text description</Typography>
          <Typography paragraph>text description</Typography>
          <Typography>text description </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
       {/* <div id="product" className="row">
        <h2>greeting : {greeting}</h2>
        <h4>
          showLatest : {showLatest.name} {showLatest.total}
        </h4>
        <h5>lastPrice : {lastPrice}</h5>
        <input id="productId" value={product._id} type="hidden" />
        <div className="col-4">
          <div className="text-center">
            <p id="endAt" className="font-weight-bold">
              Time left {format(timer)}
            </p>
            <img
              className="img-fluid mx-auto"
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
            <p id="Description" className="font-weight-bold mt-2 text-center">
              {product.productDis}
            </p>
            <div id="price" className="text-center">
              <button
                id="addFive"
                className=" btn btn-primary mr-2"
                value="500"
                onClick={addMoneyHandler}
              >
                500$
              </button>
              <button
                id="addTen"
                className=" btn btn-primary mr-2"
                value="1000"
                onClick={addMoneyHandler}
              >
                1000$
              </button>
              <button
                id="addTwen"
                className=" btn btn-primary mr-2"
                value="2000"
                onClick={addMoneyHandler}
              >
                2000$
              </button>
            </div>
          </div>
        </div>
      </div> */}
       </Then>
     </If>
     <Else>
       <If condition={timer===0 }condition={ Object.keys(showLatest).length && timer===0} >
         <Then>
              <Dialog
              fullWidth={true}
              maxWidth='sm'
              open={open}
              aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">congratulations !!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                {`congratulations for ${showLatest.name} you have bought this Product By ${showLatest.total} `}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button component={Link} to="/" variant="contained" color="primary">
                      Back
                    </Button>
                  </DialogActions>
              </Dialog> 
         </Then>
       </If>
      </Else>
      <Else>
       <If condition={timer===0 } condition={! Object.keys(showLatest).length && timer===0} >
         <Then>
              <Dialog
              fullWidth={true}
              maxWidth='sm'
              open={open}
              aria-labelledby="max-width-dialog-title"
              >
              <DialogTitle id="max-width-dialog-title">No one Bidded !!</DialogTitle>
              <DialogContent>
                <DialogContentText>
                No one Bidded on this product, please come back agin on another auction
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button component={Link} to="/" variant="contained" color="primary">
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
