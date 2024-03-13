import React from 'react'
import "./register.css"


export default function Register() {
  return (
    <div className="wrapper">
    <div className="register_box">
        <div className="register-header">
            <span> Register </span>
        </div>

        <div className="register_box">
            <input type="text" id="user" className="input-field" required /> 
            <label for="user" className="label"> Username </label>
            <i className="bx bx-user icon" />
        </div>

        <div className="register_box">
            <input type="password" id="pass" className="input-field" required /> 
            <label for="pass" className="label">Password</label>
            <i className="bx bx-lock-alt icon"> </i>
        </div>

    <div className="register_box">
        <input type="submit"  className="input-submit" value="Register" />
    </div>

    <div className="login">
        <span> Already have a account? <a> <b> Login </b> </a></span>
    </div>
    </div>
</div>
  )
}
