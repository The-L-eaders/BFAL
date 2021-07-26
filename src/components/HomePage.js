import React, { useEffect, useState } from "react";
import "./SASS/HomePage.scss";
import { SnackbarProvider, useSnackbar } from "notistack";
import PropTypes from "prop-types";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import superAgent from "superagent";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "./SASS/slider.scss";
import { width } from "@material-ui/system";
import io from "socket.io-client";
import { ColorlibConnector } from "./Styles/HomePageStyles.js";
import { useColorlibStepIconStyles } from "./Styles/HomePageStyles.js";


import useStyles from "./Styles/HomePageStyles.js";

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
    enqueueSnackbar(`${event.name} sold with price ${event.price} recently !`);
  };

  function mySocket() {
    socket.on("soldEvent", (event) => {
      handleClick(event);
    });
  }
  return <React.Fragment>{mySocket()}</React.Fragment>;
}

function HomePage() {

  const [activeStep, setActiveStep] = React.useState(3);
  const steps = getSteps();
  const [product, setProduct] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = product.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };
  
  const classes = useStyles();

  useEffect(() => {
    superAgent
      .get("https://bid-fast-and-last.herokuapp.com/products")
      .then((data) => {
        setProduct(data.body);
      })
      .catch((e) => console.log(e));
  }, []);


  return (
    <>
      <div className="backGroundImg"></div>

      <SnackbarProvider maxSnack={1}>
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
      <div className="slider-tit">Available Products</div>
      <div className="slider">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {product.length ? (
          product.map((slide, index) => {
            return (
              <>
                <div
                  className={index === current ? "slide active" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <img
                      src={slide.productImage}
                      alt="product-image"
                      className="image"
                    />
                  )}
                </div>
              </>
            );
          })
        ) : (
          <h1>No Products Available</h1>
        )}
      </div>
    </>
  );
}

export default HomePage;
