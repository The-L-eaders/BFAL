import React, { useState, useEffect ,useContext} from "react";
import myCookie from "react-cookies";
import  superAgent  from "superagent";
import socketIOClient from "socket.io-client";
import { BiddingContext } from '../contaxt/biddingContext'
const ENDPOINT = "http://localhost:4000/car";

function CarNameSpace() {

  const [response, setResponse] = useState("");
  const socket = socketIOClient(ENDPOINT);
  console.log(socket)
  const {product,setProduct,timer,setTimer,lastPrice,setLastPrice,greeting,setGreeting}= useContext(BiddingContext)


  useEffect(()=>{
    superAgent
    .get(ENDPOINT)
    .set(`Authorization`, `Bearer ${myCookie.load("token")}`)
    .then((data) => {
      console.log(data.body,';;;;;;;;;')
      setProduct(data.body.data);
      setTimer(data.body.data.timer)
      setLastPrice(data.body.data.startingPrice)
    })
    .catch((e) => console.log(e));
  }
  ,[])

  socket.emit("newUser", { token: myCookie.load("token") });
  socket.on("greeting", (data) => {
    setGreeting(data);
  });
  

    const handelClick=()=>{
      socket.emit("startBidding", { counter:15, lastPrice:product.startingPrice, text : myCookie.load("token")});
      console.log('blaaaaa')
      
    }

    const addMoneyHandler=(e)=>{
      const x=lastPrice +parseInt(e.target.value)
      setLastPrice(x)
      socket.emit("increasePrice", {
        lastPrice: lastPrice,
        token: myCookie.load("token"),
      });
    }

    // socket.on("liveBid", (latest) => {
    //   if (latest === 0 || latest === null) {
    //     // latest = lastPrice;
    //     null;
    //   } else {
    //     setLastPrice(data)
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
      setTimer(data)
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

  

  return product ? (
    <>
    <div id="product" className="row">
        <h2>greeting  :  {greeting}</h2>
        <h4>
          {/* {state.showLatest.name} {state.showLatest.total} */}
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
      </div>
    </>
  ): null;
}

export default CarNameSpace;