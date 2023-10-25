import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import TaskManager from "./TaskManager";
import { auth, provider } from "./firebase";
import './login.css';

import './App.css';


const Login = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const handleLogin = (event) => {
  const[value,setValue]=useState('')
  const handleLogin = async () => {

    
    signInWithPopup(auth, provider).then((data)=>{
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
    })
  }
  useEffect(()=>{
    setValue(localStorage.getItem('email'))
  },[])
  

  return (
    <>
    {value?
    <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="" class="sign-in-form">
          <h2 class="title">Sign In</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input id="name" type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}/>
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password"  id="pass"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className='btn solid' onClick={handleLogin}>Login</button>
      <div style={{ color: 'red' }}>{error && <p>{error}</p>}</div>

          <p class="social-text">Or Sign in with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
            <i onClick={handleLogin} class="fab fa-google"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div><br/>
        </form>


        <form action="" class="sign-up-form">
          <h2 class="title">Sign Up</h2>
          {/* <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" />
          </div> */}

          <div class="input-field">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Email" />
          </div>

          {/* <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="Password" />
          </div> */}
          
          <button type="submit" value="Sign Up" class="btn solid"><a href="reg/registration.html" style={{"text-decoration": "none"}}>Sign Up</a></button>

          <p class="social-text">Or Sign up with social platforms</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="social-icon">
              <i onClick={handleLogin} class="fab fa-google"></i>
              
            </a>
            <a href="#" class="social-icon">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">

      <div class="panel left-panel">
        <div class="content">
          <h3>New here?</h3>
          <p>Click on Sign Up to register yourself and join our community</p><br/>
          <button class="btn transparent" id="sign-up-btn">Sign Up</button>
        </div>
        {/* <img src="fav.svg" class="image" alt="" height="200px" width="200px"/> */}
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>One of us?</h3>
          <p>Click on Sign In and proceed to the main page</p><br/>
          <button class="btn transparent" id="sign-in-btn">Sign In</button>
        </div>
        {/* <img src="fav.svg" class="image" alt="" height="200px" width="200px"/> */}
      </div>
    </div>
  </div>:<TaskManager/>
}
    </>
  );
};

export default Login;







