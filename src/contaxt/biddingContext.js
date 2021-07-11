import React, { useState } from "react";
// import socketIOClient from "socket.io-client";

export const BiddingContext = React.createContext();

// const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

// export const socket = socketIOClient(ENDPOINT);
function SettingsProvider(props) {
  const [product, setProduct] = useState({});
  const [timer, setTimer] = useState(90);
  const [lastPrice, setLastPrice] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [showLatest, setShowLatest] = useState({});
  const [totalUser ,setTotalUser] = useState([])
  const state = {
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
    totalUser ,
    setTotalUser
  };
  return (
    <BiddingContext.Provider value={state}>
      {props.children}
    </BiddingContext.Provider>
  );
}

export default SettingsProvider;
