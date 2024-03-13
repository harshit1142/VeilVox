import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import "./login.css"


export default function Register() {

    const [data, setData] = useState({
        name: "",
        password: ""
    })

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

  return (
      <div className="wrapper">
          <div className="login_box">
              <div className="login-header">
                  <span> Register </span>
              </div>

              <div className="input_box">
                  <input type="text" id="user" name="name" autocomplete="off" value={data.name} onChange={handleChange} className="input-field" required />
                  <label for="user" className="label">Username </label>
                  <i className="bx bx-user icon" />
              </div>

              <div className="input_box">
                  <input type="password" id="pass" name='password' value={data.password} onChange={handleChange} className="input-field" required />
                  <label for="pass" className="label">Password</label>
                  <i className="bx bx-lock-alt icon"> </i>
              </div>

              <div className="remember-forget">
                  {/* <div className="remember-me">
            <input type="checkbox" id="remember" /> 
            <label for="remember" className="label">Remeber me</label>
            </div> */}


                  {/* <div className="forget">
                <a >Forget Password</a>
            </div> */}
              </div>
              <div className="input_box">
                  <input type="submit" className="input-submit" value="Register" />
              </div>

              <div className="register">
                  <span> Already have an account? <Link to="/login" >Login</Link></span>
              </div>
          </div>
      </div>
  )
}
