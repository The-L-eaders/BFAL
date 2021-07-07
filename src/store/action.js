import superAgent from "superagent";
import myCookie from "react-cookies";
const URL = "https://bid-fast-and-last.herokuapp.com/car";

export const getRemoteProduct = () => (dispatch, state) => {
  superAgent
    .get(URL)
    .set(`Authorization`, `Bearer ${myCookie.load("token")}`)
    .then((data) => {
      dispatch(getProduct(data.body.data));
    })
    .catch((e) => console.log(e));
};

export const getProduct = (payload) => {
  return {
    type: "GET",
    payload: payload,
  };
};
