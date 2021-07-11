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
import superAgent from "superagent";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

  btn: {
    display: "block",
    width: "40%",
    margin: "auto",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "lightgrey",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 5),
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    // color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
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
    // display: "flex",
    // flexWrap: 'wrap',
    width: "50%",
    textAlign: "center",
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

  const handelLoginSubmit = (e) => {
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
        handleCloseLogin();
      })
      .catch((e) => console.log(e));
  };
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
        handleClose();
      })
      .catch((e) => console.log(e));
  };

  const [isDarkMode, setIsDarkMode] = useState(() => false);

  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleLogout = () => {
    reactCookie.remove("token");

    handleMenuClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
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
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleOpenLogin}>Login</MenuItem>
      <MenuItem onClick={handleOpen}>Register</MenuItem>

      <Divider />
      <Link to="/add">
        <MenuItem onClick={handleMenuClose}>Add Product</MenuItem>
      </Link>
      <Link to="/category">
        <MenuItem onClick={handleMenuClose}>Category</MenuItem>
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
      {/* Register Modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h3>Register </h3>
              <form
                onSubmit={handelSubmit}
                className={classes.root}
                noValidate
                action="/register"
                method="POST"
              >
                <TextField
                  type="text"
                  name="userName"
                  id="standard-basic"
                  label="User Name"
                  variant="outlined"
                />
                <TextField
                  type="password"
                  name="password"
                  id="filled-basic"
                  label="Password"
                  variant="outlined"
                />
                <TextField
                  type="email"
                  name="email"
                  id="filled-basic"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  type="date"
                  id="birthday"
                  name="birthday"
                  id="filled-basic"
                  variant="outlined"
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
            </div>
          </Fade>
        </Modal>
      </div>

      {/* Login Modal */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openLogin}
          onClose={handleCloseLogin}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openLogin}>
            <div className={classes.paper}>
              <h3>Login </h3>
              <form
                onSubmit={handelLoginSubmit}
                className={classes.root}
                noValidate
              >
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
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
      <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <img
              src="https://freepngimg.com/thumb/auction/22904-7-auction-transparent-image-thumb.png"
              className={classes.image}
            />

            <Typography className={classes.title} variant="h6" noWrap>
              Bid Fast & Last
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
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
