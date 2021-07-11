import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 800,
      margin:'30px',
      marginLeft: '280px'
    },
    buttons:{
      marginLeft: '0px'
    },
    button:{
        margin:'4px',
        padding:'10px',
        background: theme.background,
        border: 0,
        borderRadius: 3,
        boxShadow: theme.boxShadow,
        color: 'white',
        height: 40,
        background: 'linear-gradient(45deg, #484488 30%, #051587, #0631c8 90%)',
        boxShadow: ' rgba(255, 255, 255, 1)',
    },
    timer:{
        fontSize:'50px',
    },
    time:{
        fontSize: '50px'
    }
  }));

  export default useStyles;