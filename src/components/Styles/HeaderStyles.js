import { makeStyles } from "@material-ui/core/styles";

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
      fontFamily: 'Lobster',
      fontSize: "2.5em",
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

  export default useStyles;