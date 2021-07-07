import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Reducers
import addProductReducer from "./AddProductReducer.js";

let reducer = combineReducers({addProductReducer})
const store = () => {
  return createStore(reducer, applyMiddleware(thunk));
};

export default store();
