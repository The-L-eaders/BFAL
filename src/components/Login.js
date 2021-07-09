import React from "react";
import superAgent from "superagent";
import reactCookie from "react-cookies";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

function LogIn() {
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
        e.target.reset();
        // history.push('/profile')
      })
      .catch((e) => console.log(e));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 100,
      marginBottom: 50,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
   
        width: "60%",
        margin: "auto",
    },

    form: {
      marginTop: 20,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      "& > *": {
        width: "60%",
        margin: "auto",
      },
    },
    input: {
      padding: 10,
    },

    btn: {
      width: "30%",
    },
    title: {
      textAlign: "center",
      fontSize: "3em",
      marginBottom: 20,
    },
  }));

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
