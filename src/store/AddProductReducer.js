import { getProduct } from "../store/action";

let addProduct = {
  product: {},
  lastUser: "",
  lastPrice: 0,
  newUser: "",
  showLatest: {},
};

const addProductReducer = (state = addProduct, action) => {
  let { type, payload } = action;
  switch (type) {
    case "GET":
      if (payload) {
        return {
          ...state,
          product: payload,
          lastPrice: parseInt(payload.startingPrice),
        };
      }

    case "IncreasePrice":
      return { ...state, lastPrice: state.lastPrice + payload };

    case "greeting":
      return { ...state, newUser: `${payload} has joined` };

    case "showLatest":
      return {
        ...state,
        lastUser: payload.name,
        showLatest: { name: payload.name, total: payload.total },
      };

    case "updateLastPrice":
      return {
        ...state,
        lastPrice: parseInt(payload),
      };

    case "deleteProduct":
      return {
        ...state,
        product: {},
      };

    default:
      return state;
  }
};

export const increasePrice = (payload) => {
  return {
    type: "IncreasePrice",
    payload: payload,
  };
};

export const greeting = (payload) => {
  return {
    type: "greeting",
    payload: payload,
  };
};

export const showLatest = (payload) => {
  return {
    type: "showLatest",
    payload: payload,
  };
};

export const updateLastPrice = (payload) => {
  return {
    type: "updateLastPrice",
    payload: payload,
  };
};

export const deleteProduct = () => {
  return {
    type: "deleteProduct",
  };
};

export default addProductReducer;
