import React from "react";
import myCookie from "react-cookies";
import superAgent from "superagent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

function AddProduct() {
  const handelSubmit = (e) => {
    let data = {
      name: e.target.name.value,
      price: e.target.price.value,
      description: e.target.description.value,
      image: e.target.image.value,
      category: e.target.category.value,
      timer: e.target.timer.value,
    };
    e.preventDefault();
    const user = superAgent
      .post("https://bid-fast-and-last.herokuapp.com/add")
      .set(`Authorization`, `Bearer ${myCookie.load("token")}`)
      .send(data)
      .then((data) => {
        e.target.reset();
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
      marginTop: 20,
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
        <form
          onSubmit={handelSubmit}
          action="/add"
          method="post"
          className={classes.form}
        >
          <Typography className={classes.title}> Add Your Product</Typography>
          <TextField
            className={classes.input}
            type="text"
            name="name"
            id="standard-basic"
            label="Product Name"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            type="number"
            name="price"
            id="filled-basic"
            label="Starting Price"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            type="text"
            name="description"
            id="filled-basic"
            label="Product Description"
            variant="outlined"
          />
          <TextField
            className={classes.input}
            type="text"
            name="image"
            id="filled-basic"
            label="Product Image"
            variant="outlined"
          />{" "}
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              className={classes.input}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
            >
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="house">House</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label" className={classes.input}>
              Time
            </InputLabel>
            <Select
              className={classes.input}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="timer"
            >
              <MenuItem value="90">Default 1:30 min</MenuItem>
              <MenuItem value="3600">1 Hour</MenuItem>
              <MenuItem value="43200">12 Hours</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            type="submit"
            color="primary"
            className={classes.btn}
          >
            Add To Auction
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default AddProduct;
