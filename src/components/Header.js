import React from "react";
import "./SASS/DarkMode.scss";
import { Link } from "react-router-dom";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import reactCookie from "react-cookies";

import DarkModeToggle from "react-dark-mode-toggle";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 50,
    height: 50,
  },
  home: {
    textDecoration: "none",
    color: "white",
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },


  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",

  },
  fullList: {
    width: "auto",
  },
}));

function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [isDarkMode, setIsDarkMode] = useState(() => false);

  const handleLogout = () => {
    reactCookie.remove("token");

    handleMenuClose();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {reactCookie.load("token") ? (
        <>
          <Typography variant="button" onClick={handleLogout}>Logout</Typography>
          <Typography variant="button" onClick={handleMenuClose}>Profile</Typography>
        </>
      ) : null}

      <Link to="/login">
        <Typography variant="button">Login</Typography>
      </Link>

      <Link to="/register">
        <Typography variant="button">Register</Typography>
      </Link>

      <Divider />
      <Link to="/add">
        <Typography variant="button" onClick={handleMenuClose}>Add Product</Typography>
      </Link>
      <Link to="/category">
        <Typography variant="button" onClick={handleMenuClose}>Category</Typography>
      </Link>
    </div>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <HomeIcon />
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.grow} position="fixed">
        <AppBar >
          <Toolbar>
            <img
              src="https://freepngimg.com/thumb/auction/22904-7-auction-transparent-image-thumb.png"
              className={classes.image}
            />

            <Typography className={classes.title} variant="h6" noWrap>
              Bid Fast & Last
            </Typography>

            <div className={classes.grow} />

            <DarkModeToggle
              onChange={setIsDarkMode}
              checked={isDarkMode}
              size={40}
            />
            <div className={classes.sectionDesktop}>
              <Link to="/" className={classes.home}>
                <MenuItem className={`${isDarkMode}`}>
                  <HomeIcon />
                </MenuItem>
              </Link>

              <div>
                {
                  <React.Fragment key="bottom">
                    <Button onClick={toggleDrawer("bottom", true)}>Menu</Button>
                    <Drawer
                      anchor="bottom"
                      open={state["bottom"]}
                      onClose={toggleDrawer("bottom", false)}
                    >
                      {list("bottom")}
                    </Drawer>
                  </React.Fragment>
                }
              </div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </div>
    </>
  );
}

export default Header;
