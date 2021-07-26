import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "5%",
    display: "flex",
    flexWrap: "wrap",
    margin: "auto",
    width: "70%",
  },
  root: {
    margin: "auto",
    width: "40%",
    marginTop: "0",
    background: "whitesmoke",
  },
  media: {
    height: 250,
  },
  pageTitle: { 
    marginTop: "10%",
    margin: "auto",
    textAlign: "center",
    fontSize: "2em",
  },
}));

export default useStyles;
