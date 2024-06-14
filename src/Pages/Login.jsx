import React from 'react'
import {useNavigate,Link} from 'react-router-dom' 
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../Firebase"
function Login() {
  const [error, setError] = useState(false);
  const navigate=useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try{
await signInWithEmailAndPassword(auth, email, password)
navigate("/")
    }
    catch(error){
setError(true);
    }
  }
  return (
    <div className='formContainer'>
        <div className='formwrapper'>
            <span className='logo'>MESSENGER</span>
            <span className='title'>LOGIN</span>
            <form onSubmit={submitHandler}>
               
                <input type='email' placeholder='Email'></input>
                <input type='password' placeholder='Password'></input>
                
                
                <button>SIGN IN</button>
                {error && <span style={{color:'red'}}>Incorrect Email or Password</span>}
            </form>
            <p>You Dont have an account ? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login