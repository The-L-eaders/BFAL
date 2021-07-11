/**
 * name: instance.js
 * desc: the axios instance should be decalred here.
 */

 import axios from 'axios';
 import { GLOABL_CONSTANS } from '../Constant';
 import cookie from "react-cookies";

 /**
  * declare the instance.
  */
 const instance = axios.create({
     baseURL: "https://bid-fast-and-last.herokuapp.com/",
     params: {},
 });

 /**
 * add a request interceptor.
 */
instance.interceptors.request.use(async config => {
    let token = cookie.load(GLOABL_CONSTANS.USER_TOKEN);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});
 
 /**
  * export instance as default.
  */
 export default instance;