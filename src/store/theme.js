import { createTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
    h4: {
      fontSize: 50,
      textAlign: "center",
    },
    h6: {
      fontSize: 20,
      marginTop: 10,
      textAlign: "center",
    },
    button: {
      textDecoration: "none",
      color: "black",
      fontSize: 15,
      backgroundColor: "white",
      lineHeight: 2,
    },
  },

  palette: {
    primary: {
      main: "#ad1457",
    },
    secondary: {
      main: "#5e35b1",
    },
  },
  status: {
    danger: "#e53e3e",
  },

  overrides: {
    // Style sheet name
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        // fontFamily: "cursive",
        color: "black",
      },
    },
  },
});

export default theme;
