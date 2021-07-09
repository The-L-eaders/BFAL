import React from "react";
import "./SASS/Footer.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    position: "relative",
    bottom: 0,
    width: "100%",
  },
  mainBox: {
    flexGrow: 1,
    marginLeft: "40%",
    width: "90%",
  },
  link: {
    color: "white",
  },
  image: {
    width: 150,
    height: 150,
    marginLeft: 100,
  },

  toolbar: {
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
  },
  title: {
    fontSize: "3em",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar className={classes.root} >

      <Box className={classes.mainBox} >
        <Box borderBottom={1} width="20%">
          More
        </Box>

        <Link href="/" className={classes.link}>
          {" "}
          About us
        </Link>
        <Link href="/" className={classes.link}>
          {" "}
          Contact
        </Link>
      </Box>

      <img
        src="https://freepngimg.com/thumb/auction/22904-7-auction-transparent-image-thumb.png"
        className={classes.image}
      />
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h5">
          Bid Fast & Last
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
