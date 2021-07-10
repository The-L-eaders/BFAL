import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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
        // fontSize: 16,
        borderRadius: 3,
        boxShadow: theme.boxShadow,
        color: 'white',
        height: 40,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        background: 'linear-gradient(45deg, #484488 30%, #051587, #0631c8 90%)',
        boxShadow: ' rgba(255, 255, 255, 1)',
    },
    timer:{
        fontSize:'50px',
        // color: 'blue',
        // animationIterationCount:3,
    // webkitAnimationIterationCount:3,
    

    },
    time:{
        // color: 'blue',

        fontSize: '50px'
    }
  }));

  export default useStyles;