import React from "react";
import { Route, Switch } from "react-router-dom";
import isDarkMode from './components/Header'
import { Provider } from "react-redux";
import store from "./store/";
import CarNameSpace from "./components/BiddingPage";
import Header from "./components/Header";
import Category from "./components/Category";
import AddProduct from "./components/AddProduct";
import HomePage from "./components/HomePage";

function App() {
  return (
    <main>
      <Provider store={store}>
        <Header />

        <Switch>
          <Route exact path="/category">
            <Category />
          </Route>

          <Route exact path="/add">
            <AddProduct />
          </Route>

          <Route exact path="/car">
          <CarNameSpace />
          </Route>

          <Route exact path="/">
            {null}
          </Route>
        </Switch>
        <HomePage />
      </Provider>
    </main>
  );
}
export default App;
