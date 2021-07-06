import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

function CarNameSpace() {
  const [response, setResponse] = useState("");
  const socket = socketIOClient(ENDPOINT);

  socket.on("connection", (data) => {
    setResponse("I'm in /car");
  });

  return <p>{response}</p>;
}

export default CarNameSpace;
