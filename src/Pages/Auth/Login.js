import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import "./login.css"
import { setUser } from '../../Redux/UserRedux';


export default function Login() {
    const history=useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        user: "",
        password: ""
    })

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit() {
        const response = await fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username: data.user,
                password: data.password
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Login Successfully!!");
            dispatch(setUser(res.data));
            history.push("/main");

        } else {
            alert("Error Occured" + res.message);
        }
    }

  return (
    <div className="wrapper">
    <div className="login_box">
        <div className="login-header">
            <span> Login </span>
        </div>

        <div className="input_box">
                  <input type="text" id="user" name="user" autocomplete="off" value={data.name} onChange={handleChange} className="input-field" required /> 
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
        <input type="submit" onClick={handleSubmit}  className="input-submit" value="Login" />
    </div>

    <div className="register">
        <span> Don't have an account? <Link to="/register" >Register</Link></span>
    </div>
    </div>
</div>
  )
}
