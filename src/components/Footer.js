import React from "react";
import "./SASS/Footer.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
const useStyles = makeStyles((theme) => ({
  root: {
    color: "white",
    position: "relative",
    bottom: 0,

    // width: "100%",
  },
  mainBox: {
    display: 'flex',
    // flexGrow: 1,
    justifyContent: 'center',
    // textAlign:'center',
    alignContent: 'spaceBetween',

  },
  link: {
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 100,
  },

  toolbar: {
    alignItems: "flex-start",
    paddingBottom: theme.spacing(2),
  },

  title: {
    fontSize: "3rem",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer>
      <div className="column">
        <a className="footer_title">Bid Fast & Last</a>
        <a href="#">MAKE AUCTION PROCESS EASIER AND MORE ACCESSIBLE, BY PROVIDING REAL-TIME AUCTION WEB-APPLICATION. ALLOW USERS NOT ONLY TO BUY PRODUCTS BUT TO BE ABLE ALSO TO SELL PRODUCTS.</a>
        <a href="#" title="Facebook"><FacebookIcon></FacebookIcon></a>
        <a href="#" title="Instagram"><InstagramIcon></InstagramIcon></a>
        <a href="#" title="Twitter"><TwitterIcon></TwitterIcon></a>
      </div>
      <div className="column">
        <a className="footer_title">OTHER LINKS</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Ticket</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="column">
        <a className="footer_title">SHORT CUT</a>
        <a href="/">Our Services</a>
        <a href="/about">About Us</a>
      </div>
      <div className="column">
        <a className="footer_title">LATEST NEWS</a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/100x100/?car" /></a>
        <a href="" title="Lorem ipsum dolor sit amet"><img src="https://source.unsplash.com/100x100/?house" /></a>
      </div>
      <div className="column">
        <a className="footer_title">GET IN TOUCH</a>
        <a title="Address"><i className="fa fa-map-marker"></i> 007, 7th street, province/state, Amman - 1111</a>
      </div>

      <div className="sub-footer">
        © CopyRights 2021 BidFast&Last || All rights reserved
      </div>
    </footer>
  );
}
