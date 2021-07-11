import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Category from "./components/Category";
import CategoryProduct from './components/CategoryProduct';
import AddProduct from "./components/AddProduct";
import HomePage from "./components/HomePage";
import BiddingPage from './components/BiddingPage'
/**
 * This component will declare all routes
 * 
 * @returns {JSX}
 */
export default function Main() {
    return (
        <Switch>
            <Route exact component={HomePage} path='/' />
            <PrivateRoute exact component={AddProduct} path='/add' />
            <PrivateRoute exact component={Category} path='/category' />
            <PrivateRoute exact component={BiddingPage} path='/category-products/:name' />
        </Switch>
    )
}