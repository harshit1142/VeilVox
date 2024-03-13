import React from 'react'
import "./login.css"


export default function Login() {
  return (
    <div className="wrapper">
    <div className="login_box">
        <div className="login-header">
            <span> Login </span>
        </div>

        <div className="input_box">
            <input type="text" id="user" className="input-field" required /> 
            <label for="user" className="label">Username </label>
            <i className="bx bx-user icon" />
        </div>

        <div className="input_box">
            <input type="password" id="pass" className="input-field" required /> 
            <label for="pass" className="label">Password</label>
            <i className="bx bx-lock-alt icon"> </i>
        </div>

    <div className="remember-forget">
            <div className="remember-me">
            <input type="checkbox" id="remember" /> 
            <label for="remember" className="label">Remeber me</label>
            </div>

            <div className="forget">
                <a >Forget Password</a>
            </div>
        </div>
    <div className="input_box">
        <input type="submit"  className="input-submit" value="Login" />
    </div>

    <div className="register">
        <span> Don't have an account? <a >Register</a></span>
    </div>
    </div>
</div>
  )
}
