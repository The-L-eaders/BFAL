import React from "react";
import "./SASS/DarkMode.scss";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import reactCookie from "react-cookies";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ClassOutlinedIcon from "@material-ui/icons/ClassOutlined";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 70,
    height: 70,
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

  link: {
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    width: "100%",
  },

  btn: {
    marginTop: "30%",
    width: "100%",
    content: "center",
    border: "solid 2px #ad1457",
    fontSizeAdjust: "0.58",
  },

  logoutBtn: {
    marginTop: "30%",
    width: "100%",
    border: "solid 2px black",
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
    padding: "30px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#efefef",
    height: "100%  ",
  },
  fullList: {
    width: "auto",
  },
}));
function Header() {
  const history = useHistory();
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
    reactCookie.remove("userName");
    history.push("/");
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
      <img
        src="https://freepngimg.com/thumb/auction/22904-7-auction-transparent-image-thumb.png"
        className={classes.image}
      />
      {reactCookie.load("token") ? (
        <>
          <Link to="/profile" className={classes.link}>
            <Button
              variant="button"
              className={classes.btn}
              onClick={handleMenuClose}
            >
              <PermIdentityIcon />
              Profile
            </Button>
          </Link>

          <Link to="/add" className={classes.link}>
            <Button
              variant="button"
              className={classes.btn}
              onClick={handleMenuClose}
            >
              <AddBoxOutlinedIcon />
              Add Product
            </Button>
          </Link>

          <Link to="/category" className={classes.link}>
            <Button
              variant="button"
              className={classes.btn}
              onClick={handleMenuClose}
            >
              <ClassOutlinedIcon />
              Category
            </Button>
          </Link>

          <Link className={classes.link}>
            <Button
              variant="button"
              className={classes.logoutBtn}
              onClick={handleLogout}
            >
              <MeetingRoomOutlinedIcon />
              Logout
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={classes.link}>
            <Button variant="button" className={classes.btn}>
              <ExitToAppOutlinedIcon />
              Login
            </Button>
          </Link>
          <Link to="/register" className={classes.link}>
            <Button variant="button" className={classes.btn}>
              <CreateOutlinedIcon />
              Register
            </Button>
          </Link>
        </>
      )}
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
          <MenuIcon />
        </IconButton>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <div className={classes.grow} position="fixed">
        <AppBar>
          <Toolbar>
            <img
              src="https://freepngimg.com/thumb/auction/22904-7-auction-transparent-image-thumb.png"
              className={classes.image}
            />
            <Typography className={classes.title} variant="h6" noWrap>
              Bid Fast & Last
            </Typography>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <Link to="/" className={classes.home}>
                <MenuItem>
                  <HomeIcon />
                </MenuItem>
              </Link>
              <div>
                {
                  <React.Fragment key="right">
                    <Button onClick={toggleDrawer("right", true)}>
                      <MenuIcon />
                    </Button>
                    <Drawer
                      anchor="right"
                      open={state["right"]}
                      onClose={toggleDrawer("right", false)}
                    >
                      {list("right")}
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
