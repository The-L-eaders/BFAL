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
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  return (
    <form onSubmit={handelSubmit} action="/add" method="post">
      <TextField
        type="text"
        name="name"
        id="standard-basic"
        label="Product Name"
        variant="outlined"
      />
      <TextField
        type="number"
        name="price"
        id="filled-basic"
        label="Starting Price"
        variant="outlined"
      />
      <TextField
        type="text"
        name="description"
        id="filled-basic"
        label="Product Description"
        variant="outlined"
      />
      <TextField
        type="text"
        name="image"
        id="filled-basic"
        label="Product Image"
        variant="outlined"
      />{" "}
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
        >
          <MenuItem value="car">Car</MenuItem>
          <MenuItem value="house">House</MenuItem>
        </Select>
      </FormControl>
    
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="timer"
        >
          <MenuItem value="90">Default 1:30 min</MenuItem>
          <MenuItem value="3600">1 Hour</MenuItem>
          <MenuItem value="43200">12 Hours</MenuItem>
        </Select>
      </FormControl>
      <Button variant="outlined" type="submit" color="primary">
        Add To Auction
      </Button>
    </form>
  );
}

export default AddProduct;
