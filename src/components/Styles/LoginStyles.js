import { makeStyles } from "@material-ui/core/styles";

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 150,
      marginBottom: 50,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",

      width: "60%",
      margin: "auto",
    },

    form: {
      marginTop: 20,
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      "& > *": {
        width: "60%",
        margin: "auto",
      },
    },
    input: {
      padding: 10,
    },

    btn: {
      width: "30%",
    },
    title: {
      textAlign: "center",
      fontSize: "3em",
      marginBottom: 20,
    },
  }));


  export default useStyles