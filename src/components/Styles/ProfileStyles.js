import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addCircle: {
    marginTop: 90,
    marginLeft: 50,
    fontSize: 50,
    backgroundColor: "#ad1457",
    width: 190,
    height: 190,
    borderRadius: 190 / 2,
    display: "flex",
    justifyContent: "center",
  },

  root: {
    display: "block",
    marginLeft: 70,
    width: "80%",
  },

  card: {
    boxShadow: `0 20px 10px rgba(0, 0, 0, 0.12)`,
    marginTop: 2,
    marginBottom: "2%",
    display: "flex",
    flexWrap: "wrap",
    width: "95%",
    margin: "auto",
    backgroundColor: "#F0F0F0",
  },

  UserCard: {
    margin: "auto",
    marginTop: 150,
    textAlign: "center",
    width: "90%",
    padding: "1%",
    backgroundColor: "#F0F0F0",
  },

  heading: {
    boxShadow: `0 20px 20px rgba(0, 0, 0, 0.12)`,
    fontSize: theme.typography.pxToRem(20),
    backgroundColor: "#FCECF1",
  },

  innerRoot: {
    margin: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    width: "40%",
    textAlign: "center",
  },

  text1: {
    fontSize: "15px",
    margin: "auto",
    textAlign: "center",
  },
}));

export default useStyles;
