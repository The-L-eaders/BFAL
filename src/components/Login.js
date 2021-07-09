import React from "react";
import superAgent from "superagent";
import reactCookie from "react-cookies";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function LogIn() {
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
        e.target.reset();
      })
      .catch((e) => console.log(e));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  return (
    <form onSubmit={handelSubmit} className={classes.root} noValidate>
      <TextField
        id="standard-basic"
        label="Email"
        type="email"
        name="email"
        variant="outlined"
      />
      <TextField
        id="filled-basic"
        label="Password"
        variant="outlined"
        type="password"
        name="password"
      />
      <Button variant="outlined" type="submit" color="primary">
        Login
      </Button>
      {/* <input  value="LogIn" /> */}
    </form>
  );
}

export default LogIn;
