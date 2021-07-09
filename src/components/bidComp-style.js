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
        padding:'10px'
    },
    timer:{
        fontSize:'50px',
        color: 'blue',
        animationIterationCount:3,
    webkitAnimationIterationCount:3,

    },
    time:{
        color: 'blue',

        fontSize: '50px'
    }
  }));

  export default useStyles;