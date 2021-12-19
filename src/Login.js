import React, { useState } from 'react';
import "./Login.css";
import {auth,provider} from "./firebase";
import {actionTypes} from "./reducer";
import {useStateValue} from "./StateProvider";

function Login(){
  const[state,dispatch]=useStateValue();
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");

  const signIn=() =>{
    auth.signInWithPopup(provider).then(result =>{
      console.log(result);
      dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
      });
    })
    .catch(error => alert(error.message));
  };

  const SignIn=(e)=>{
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .then((auth) => {
      dispatch({
        type:actionTypes.SET_USER,
        user:auth.user,
      });
    })
    .catch(error => alert(error.message))
    
  }

    const Register=(e)=>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
      .then((auth)=>{
        console.log("Auth object",auth);
        dispatch({
          type:actionTypes.SET_USER,
          user:auth.user,
        });
      })
      .catch(err=>alert(err.message));
    }
  return (
    <div className="login">

            <div className='login__container'>
                <h1>Sign into ChatMe</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email}
                    onChange={e=>setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password'value={password}
                    onChange={e=>setPassword(e.target.value)} />

                    <button type='submit' className="login__signInButton " onClick={SignIn} >Sign In</button>
                </form>

                <button className="login__registerButton" onClick={Register} >Create</button>
            </div>
      <h4>Or</h4>
      <button type="submit" className="login__withGoogle" onClick={signIn}>
      Sign in with google
      </button>
    </div>

  );
}

export default Login;
