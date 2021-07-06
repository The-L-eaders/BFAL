import React, { useState, useEffect } from "react";
import  superAgent  from "superagent";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

function CarNameSpace() {
  const [response, setResponse] = useState("");
  const socket = socketIOClient(ENDPOINT);
  console.log(socket)

  // const w= superAgent.get(ENDPOINT)
  // .then(data=>{
  //     console.log(data,'data ')
  // }).catch(e=>console.log(e))
  useEffect(()=>{
    let token = document.cookie.split("=").pop();

    socket.emit("newUser", { token });
    // socket.on("connection", (data) => {
    //   console.log(data,'response')
    //   setResponse('data');
    // })

  }
    ,[])

    const handelClick=()=>{
      socket.emit("startBidding", { counter:60, lastPrice:10, text :'ggggg'});
      
    }

  

  return <p onClick={handelClick}>pppppp{response}</p>;
}

export default CarNameSpace;
