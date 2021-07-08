// import React from "react";
// import superAgent from "superagent";
// import reactCookie from "react-cookies";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import Modal from "@material-ui/core/Modal";
// import Backdrop from "@material-ui/core/Backdrop";
// import Fade from "@material-ui/core/Fade";

// function Register() {
//   const handelSubmit = (e) => {
//     e.preventDefault();
//     const user = superAgent
//       .post("https://bid-fast-and-last.herokuapp.com/register")
//       .send({
//         email: e.target.email.value,
//         password: e.target.password.value,
//         userName: e.target.userName.value,
//       })
//       .then((data) => {
//         e.target.reset();
//       })
//       .catch((e) => console.log(e));
//   };

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       "& > *": {
//         margin: theme.spacing(1),
//         width: "25ch",
//       },
//     },
//     modal: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     paper: {
//       backgroundColor: theme.palette.background.paper,
//       border: "2px solid #000",
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//     },
//   }));

//   const classes = useStyles();
//   const [open, setOpen] = React.useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <button type="button" onClick={handleOpen}>
//         Register
//       </button>
//       <Modal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         className={classes.modal}
//         open={open}
//         onClose={handleClose}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <div className={classes.paper}>
//             <form
//               onSubmit={handelSubmit}
//               className={classes.root}
//               noValidate
//               action="/register"
//               method="POST"
//             >
//               <TextField
//                 type="text"
//                 name="userName"
//                 id="standard-basic"
//                 label="User Name"
//                 variant="outlined"
//               />
//               <TextField
//                 type="password"
//                 name="password"
//                 id="filled-basic"
//                 label="Password"
//                 variant="outlined"
//               />
//               <TextField
//                 type="email"
//                 name="email"
//                 id="filled-basic"
//                 label="Email"
//                 variant="outlined"
//               />
//               <TextField
//                 type="date"
//                 id="birthday"
//                 name="birthday"
//                 id="filled-basic"
//                 variant="outlined"
//               />
//               <Button variant="outlined" type="submit" color="primary">
//                 Register
//               </Button>
//             </form>
//           </div>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }

// export default Register;
