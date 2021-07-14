import React from "react";
import "./SASS/Footer.scss";

import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="column">
        <a className="footer_title">Bid Fast & Last</a>
        <a href="#">
          MAKE AUCTION PROCESS EASIER AND MORE ACCESSIBLE, BY PROVIDING
          REAL-TIME AUCTION WEB-APPLICATION. ALLOW USERS NOT ONLY TO BUY
          PRODUCTS BUT ALSO TO SELL PRODUCTS.
        </a>
        <a href="#" title="Facebook">
          <FacebookIcon></FacebookIcon>
        </a>
        <a href="#" title="Instagram">
          <InstagramIcon></InstagramIcon>
        </a>
        <a href="#" title="Twitter">
          <TwitterIcon></TwitterIcon>
        </a>
      </div>

      <div className="column">
        <a className="footer_title">SHORT CUT</a>
        <a href="/">Our Services</a>
        <a href="/about">About Us</a>
      </div>
      <div className="column">
        <a className="footer_title">OTHER LINKS</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Ticket</a>
        <a href="#">Contact Us</a>
      </div>


      <div className="column">
        <a className="footer_title">GET IN TOUCH</a>
        <a title="Address">
          <i className="fa fa-map-marker"></i> 007, 7th street, province/state,
          Amman - 1111
        </a>
      </div>

 
      <div className="sub-footer">
        © CopyRights 2021 BidFast&Last || All rights reserved
      </div>
    </footer>
  );
}
