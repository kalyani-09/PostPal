import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/img/logo.png";
import { useState } from "react";
import { toast } from 'react-toastify';

 import "../css/SignUp.css";
 function SignUp(){

    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
   //Toast Function
   const notifyA=(msg)=>toast.error(msg);
   const notifyB=(msg)=>toast.success(msg);

  //Regex Function
   const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

 
   

    const submitData = async () => {
    //Checking mail
    if(!emailRegex.test(email)){
        notifyA("Invalid Email");
        return;
    }

    //Checking Password
    if(!passwordRegex.test(password)){
        notifyA("Invalid Password Syntax");
        return;
    }
   
//Sending request to server
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"  // ✅ fixed typo
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password
    }),
  })
    .then((res) => res.json()) // ✅ read body so you see backend response
    .then((data) => {
        if(data.error){
            notifyA(data.error);
        }
        else{
            notifyB(data.message);
            navigate("/signin");
        }
        console.log(data);
    }).catch(e=>console.log(e));
    
};

    return (
        <>
       <div style={{marginTop:"200px"}}>
        <div  className="container1">
            <img className="signup-img1" src={logo}/>
            <p style={{color:"black"}}>If your are new to Instagram ...<br></br>Please Create an Account </p>
            <div className="form-container1">
                <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your Email"></input>
                <input type="text" name="name"  value={name}  onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your Name"></input>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                <button type="submit" onClick={submitData}>SignUp</button>
                <div className="signin-link" style={{color:"black"}}>
                    Already have an account?<Link to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default SignUp;