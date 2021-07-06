import  superAgent  from "superagent";
import reactCookie from "react-cookies"

function LogIn() {
    const ENDPOINT = "https://bid-fast-and-last.herokuapp.com/car";

    const handelSubmi= (e)=>{
        e.preventDefault()
        // console.log(e.target.email.value)

        const user = superAgent.post('https://bid-fast-and-last.herokuapp.com/login')
        .send({
            email:e.target.email.value,
            password:e.target.password.value
        })
        .then(data=>{
            reactCookie.save('token',data.body.token)

            // console.log(data.body,';;;;;;;;;;;;')
        })
        .catch(e=>console.log(e))
        

    }
   
    return (


        <form onSubmit={handelSubmi}>
            <label> Email </label>
            <input type="email" name="email" required placeholder="Enter Your Email"/>


                <label> Password </label>
                <input type="password" name="password" placeholder="Enter password"/>

                    <input type="submit" value="LogIn"/>
         </form>

      )
}

 export default LogIn;