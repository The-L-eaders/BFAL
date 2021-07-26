import React, { useContext } from "react";
import superAgent from "superagent";
import reactCookie from "react-cookies";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { BiddingContext } from "../contaxt/biddingContext";

import useStyles from "./Styles/LoginStyles.js";

function LogIn() {
  const { setUserName } = useContext(BiddingContext);
  const history = useHistory();
  const handelSubmit = (e) => {
    e.preventDefault();
    const user = superAgent
      .post("https://bid-fast-and-last.herokuapp.com/login")
      .send({
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((data) => {
        reactCookie.save("token", data.body.token);
        reactCookie.save("userName", data.body.user.userName);
        e.target.reset();
        history.push("/profile");
      })
      .catch((e) => console.log(e));
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={10}>
        <form onSubmit={handelSubmit} className={classes.form} noValidate>
          <Typography className={classes.title}>Login Form</Typography>

          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            className={classes.input}
          />
          <TextField
            id="filled-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            className={classes.input}
          />
          <Button
            variant="outlined"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            Login
          </Button>
          {/* <input  value="LogIn" /> */}
        </form>
      </Paper>
    </div>
  );
}

export default LogIn;
