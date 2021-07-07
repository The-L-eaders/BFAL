import React from "react";
import { Provider } from "react-redux";
import store from "./store/";
import CarNameSpace from "./components/BiddingPage";
import Header from "./components/Header";
import LogIn from "./components/Login";

function App() {
  return (
    <>
      <Provider store={store}>
        <CarNameSpace />
        <Header />
        <LogIn />
      </Provider>
    </>
  );
}
export default App;
