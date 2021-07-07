import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import myCookie from "react-cookies";
import { getRemoteProduct } from "../store/action";
import {
  increasePrice,
  showLatest,
  greeting,
  updateLastPrice,
  deleteProduct,
} from "../store/AddProductReducer";
import { useSelector, useDispatch } from "react-redux";
const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

function CarNameSpace() {
  useEffect(() => {
    dispatch(getRemoteProduct());
    // dispatch(updateLastPrice(parseInt(state.myProduct.startingPrice)));
  }, []);

  const socket = socketIOClient(ENDPOINT);
  socket.emit("newUser", { token: myCookie.load("token") });

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      myProduct: state.addProductReducer.product,
      lastPrice: state.addProductReducer.lastPrice,
      greeting: state.addProductReducer.newUser,
      showLatest: state.addProductReducer.showLatest,
      lastUser: state.addProductReducer.lastUser,
    };
  });

  const handleStartBidding = () => {
    // console.log(typeof state.myProduct.timer)
    socket.emit("startBidding", {
      counter: state.myProduct.timer,
      lastPrice: parseInt(state.myProduct.startingPrice),
      text: state.lastUser,
    });
  };

  socket.on("greeting", (data) => {
    dispatch(greeting(data));
  });

  const addMoneyHandler = (e) => {
    dispatch(increasePrice(parseInt(e.target.value)));
    socket.emit("increasePrice", {
      lastPrice: state.lastPrice,
      token: myCookie.load("token"),
    });
  };

  socket.on("showLatest", (total) => {
    dispatch(updateLastPrice(total.total));

    dispatch(showLatest(total));

    // window.setInterval(function () {
    //   var elem = document.getElementById("bidding");
    //   elem.scrollTop = elem.scrollHeight;
    // }, 0);
  });

  socket.on("liveBid", (latest) => {
    if (latest === 0 || latest === null) {
      // latest = lastPrice;
      null;
    } else {
      dispatch(updateLastPrice(latest));
    }
  });

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
    if (data == 0) {
      if (state.lastPrice == state.myProduct.startingPrice) {
        console.log("not sold");
        dispatch(deleteProduct());
      } else {
        console.log("Sold");
        dispatch(deleteProduct());
      }
    }
  });

  // 3ebra //
  socket.on("try", (data) => {
    if (
      data.lastToken == myCookie.load("token") ||
      data.lastTokenHouse == myCookie.load("token")
    ) {
      socket.emit("sold", data);
    }
  });

  return state.myProduct ? (
    <>
      <div id="product" class="row">
        <h2>{state.greeting}</h2>
        <h4>
          {state.showLatest.name} {state.showLatest.total}
        </h4>
        <h5>{state.lastPrice}</h5>
        <input id="productId" value={state.myProduct._id} type="hidden" />
        <div class="col-4">
          <div class="text-center">
            <p id="endAt" class="font-weight-bold">
              {format(state.myProduct.timer)}
            </p>
            <img
              class="img-fluid mx-auto"
              width="400"
              src={state.myProduct.productImage}
              onClick={handleStartBidding}
            />
            <input
              type="hidden"
              value={state.myProduct.startingPrice}
              id="startingPrice"
            />
            <input type="hidden" value={state.myProduct.timer} id="timer" />
            <p id="Description" class="font-weight-bold mt-2 text-center">
              {state.myProduct.productDis}
            </p>
            <div id="price" class="text-center">
              <button
                id="addFive"
                class=" btn btn-primary mr-2"
                value="500"
                onClick={addMoneyHandler}
              >
                500$
              </button>
              <button
                id="addTen"
                class=" btn btn-primary mr-2"
                value="1000"
                onClick={addMoneyHandler}
              >
                1000$
              </button>
              <button
                id="addTwen"
                class=" btn btn-primary mr-2"
                value="2000"
                onClick={addMoneyHandler}
              >
                2000$
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export default CarNameSpace;
