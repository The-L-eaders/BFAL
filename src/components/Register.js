import React from "react";
import superAgent from "superagent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


function Register() {
  const handelSubmit = (e) => {
    e.preventDefault();
    const user = superAgent
      .post("https://bid-fast-and-last.herokuapp.com/register")
      .send({
        email: e.target.email.value,
        password: e.target.password.value,
        userName: e.target.userName.value,
      })
      .then((data) => {
        e.target.reset();
      })
      .catch((e) => console.log(e));
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },

  }));

  const classes = useStyles();


  return (
  
  
            <form
              onSubmit={handelSubmit}
              className={classes.root}
              noValidate
              action="/register"
              method="POST"
            >
              <TextField
                type="text"
                name="userName"
                id="standard-basic"
                label="User Name"
                variant="outlined"
              />
              <TextField
                type="password"
                name="password"
                id="filled-basic"
                label="Password"
                variant="outlined"
              />
              <TextField
                type="email"
                name="email"
                id="filled-basic"
                label="Email"
                variant="outlined"
              />
              <TextField
                type="date"
                id="birthday"
                name="birthday"
                id="filled-basic"
                variant="outlined"
              />
              <Button variant="outlined" type="submit" color="primary">
                Register
              </Button>
            </form>
        
  );
}

export default Register;



// {/* Register Modal */}
// <div>
// <Modal
//   aria-labelledby="transition-modal-title"
//   aria-describedby="transition-modal-description"
//   className={classes.modal}
//   open={open}
//   onClose={handleClose}
//   closeAfterTransition
//   BackdropComponent={Backdrop}
//   BackdropProps={{
//     timeout: 500,
//   }}
// >
//   <Fade in={open}>
//     <div className={classes.paper}>
//       <h3>Register </h3>
//       <form
//         onSubmit={handelSubmit}
//         className={classes.root}
//         noValidate
//         action="/register"
//         method="POST"
//       >
//         <TextField
//           type="text"
//           name="userName"
//           id="standard-basic"
//           label="User Name"
//           variant="outlined"
//         />
//         <TextField
//           type="password"
//           name="password"
//           id="filled-basic"
//           label="Password"
//           variant="outlined"
//         />
//         <TextField
//           type="email"
//           name="email"
//           id="filled-basic"
//           label="Email"
//           variant="outlined"
//         />
//         <TextField
//           type="date"
//           id="birthday"
//           name="birthday"
//           id="filled-basic"
//           variant="outlined"
//         />
//         <Button
//           variant="outlined"
//           type="submit"
//           color="primary"
//           className={classes.btn}
//         >
//           Register
//         </Button>
//       </form>
//     </div>
//   </Fade>
// </Modal>
// </div>

// {/* Login Modal */}
// <div>
// <Modal
//   aria-labelledby="transition-modal-title"
//   aria-describedby="transition-modal-description"
//   className={classes.modal}
//   open={openLogin}
//   onClose={handleCloseLogin}
//   closeAfterTransition
//   BackdropComponent={Backdrop}
//   BackdropProps={{
//     timeout: 500,
//   }}
// >
//   <Fade in={openLogin}>
//     <div className={classes.paper}>
//       <h3>Login </h3>
//       <form
//         onSubmit={handelLoginSubmit}
//         className={classes.root}
//         noValidate
//       >
//         <TextField
//           id="standard-basic"
//           label="Email"
//           type="email"
//           name="email"
//           variant="outlined"
//         />
//         <TextField
//           id="filled-basic"
//           label="Password"
//           variant="outlined"
//           type="password"
//           name="password"
//         />
//         <Button variant="outlined" type="submit" color="primary">
//           Login
//         </Button>
//       </form>
//     </div>
//   </Fade>
// </Modal>
// </div>