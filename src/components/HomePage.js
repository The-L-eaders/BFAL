import React from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import io from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
const URL = 'https://bid-fast-and-last.herokuapp.com/'


function Announcements() {
  const socket = io(URL)
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event) => {
    enqueueSnackbar(`${event.name} sold with price ${event.price} on our website recently`);
  };
  
  function mySocket(){
    socket.on("soldEvent", event => {
      handleClick(event)
    })
  }
return (
  <React.Fragment>
{mySocket()}
  </React.Fragment>
);
}


function HomePage() {
  
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Login or Register', 'Add your Product (Sellers)', 'Go and see our Categories !'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return `Register new account or Login if you already have one.`;
    case 1:
      return 'You want to sell something? Simply go to (Add Product) section in your profile and fill in the information needed!';
    case 2:
      return `Visit all products under different categories, bid and buy products that are currently in auction by going to (Category) section!`;
    default:
      return 'Unknown step';
  }
}

const classes = useStyles();
const [activeStep, setActiveStep] = React.useState(0);
const steps = getSteps();

const handleNext = () => {
  setActiveStep((prevActiveStep) => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleReset = () => {
  setActiveStep(0);
};

  return (
    <>
    <div>
<img src="https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=905&q=80" />
    </div>

    <SnackbarProvider maxSnack={5}>
      <Announcements />
    </SnackbarProvider>

<div>
    <h2> Why to go to physical auction, while you can bid online ?</h2> 
    <p>Bid Fast & Last, an online auction website that allow you to sell and buy products reliably, in 3 easy steps ></p>
</div>

    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
        
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
    </>
  );
}

export default HomePage;
