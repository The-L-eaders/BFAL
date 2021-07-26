import React from "react";
import superAgent from "superagent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

import useStyles from "./Styles/RegisterStyles";

function Register() {
  const history = useHistory();

  const handelSubmit = (e) => {
    e.preventDefault();
    const user = superAgent
      .post("https://bid-fast-and-last.herokuapp.com/register")
      .send({
        email: e.target.email.value,
        password: e.target.password.value,
        userName: e.target.userName.value,
      })
      .then((data) => {
        e.target.reset();
        history.push("/login");
      })
      .catch((e) => console.log(e));
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Paper elevation={10}>
          <form
            onSubmit={handelSubmit}
            className={classes.form}
            noValidate
            action="/register"
            method="POST"
          >
            <Typography className={classes.title}>Registration Form</Typography>
            <TextField
              type="text"
              name="userName"
              id="standard-basic"
              label="User Name"
              variant="outlined"
              className={classes.input}
            />
            <TextField
              type="password"
              name="password"
              id="filled-basic"
              label="Password"
              variant="outlined"
              className={classes.input}
            />
            <TextField
              type="email"
              name="email"
              id="filled-basic"
              label="Email"
              variant="outlined"
              className={classes.input}
            />
            <TextField
              type="date"
              id="birthday"
              name="birthday"
              id="filled-basic"
              variant="outlined"
              className={classes.input}
            />
            <Button
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.btn}
            >
              Register
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default Register;
