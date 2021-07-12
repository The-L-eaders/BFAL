import React, { useEffect } from "react";
import "./SASS/HomePage.scss";
import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import io from "socket.io-client";

const URL = "https://bid-fast-and-last.herokuapp.com/";

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <VpnKeyIcon />,
    2: <AddToPhotosIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function getSteps() {
  return [
    "Login or Register",
    "Add your Product (Sellers)",
    "Explore Our Categories !",
  ];
}

function Announcements() {
  const socket = io(URL);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    enqueueSnackbar(
      `${event.name} sold with price ${event.price} recently !`
    );
  };

  function mySocket() {
    socket.on("soldEvent", (event) => {
      handleClick(event);
    });
  }
  return <React.Fragment>{mySocket()}</React.Fragment>;
}

function HomePage() {
  const useStyles = makeStyles((theme) => ({
    actionsContainer: {
      marginBottom: theme.spacing(1),
    },
    resetContainer: {
      padding: theme.spacing(1),
    },
    root: {
      width: "70%",
      margin: "auto",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();

  return (
    <>
      <div className="backGroundImg"></div>
      
      <SnackbarProvider maxSnack={5}>
        <Announcements />
      </SnackbarProvider>
      <Typography variant="h4">
        {" "}
        Why to go to physical auction, while you can bid online ?
      </Typography>
      <Typography variant="h6">
        Bid Fast & Last, an online auction website that allow you to sell and
        buy products reliably, in 3 easy steps ...
      </Typography>

      <div className={classes.root}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
}

export default HomePage;
