import React from "react";
import { Route, Switch } from "react-router-dom";
// import isDarkMode from './components/Header'
import { Provider } from "react-redux";
import store from "./store/";
import CarNameSpace from "./components/BiddingPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Category from "./components/Category";
import AddProduct from "./components/AddProduct";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./store/theme";
import Profile from "./components/Profile";

function App() {
  return (
    <main>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Header />

          <Switch>
            <Route exact path="/category">
              <Category />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/add">
              <AddProduct />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/car">
              <CarNameSpace />
            </Route>

            <Route exact path="/">
              <HomePage />
            </Route>
          </Switch>

          {/* <Footer /> */}
        </Provider>
      </ThemeProvider>
    </main>
  );
}
export default App;
