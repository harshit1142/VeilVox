import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

import "./login.css"
import { setUser } from '../../Redux/UserRedux';


export default function Login() {
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
    const history=useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        user: "",
        password: ""
    })
    
    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
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
            history.push("/feeds");

        } else {
            alert("Error Occured" + res.message);
        }
    }
     
    if(!(user ===null  || user.name==="")){
       return history.push("/feeds");
    }
    

  return (
    <div className="wrapper">
    <div className="login_box">
        <div className="login-header">
            <span> Login </span>
        </div>
        
        <form >
        <div className="input_box">
                  <input type="text" id="user" name="user" autoComplete="off" value={data.name} onChange={handleChange} className="input-field" required /> 
            <label htmlFor="user" className="label">Username </label>
            <i className="bx bx-user icon" />
        </div>

        <div className="input_box">
                  <input type="password" id="pass" name='password' value={data.password} onChange={handleChange} className="input-field" required /> 
            <label htmlFor="pass" className="label">Password</label>
            <i className="bx bx-lock-alt icon"> </i>
        </div>

    <div className="remember-forget">
            {/* <div className="remember-me">
            <input type="checkbox" id="remember" /> 
            <label htmlFor="remember" className="label">Remeber me</label>
            </div> */}


            {/* <div className="forget">
                <a >Forget Password</a>
            </div> */}
        </div>
    <div className="input_box">
        <input type="submit" onClick={handleSubmit}  className="input-submit" value="Login" />
    </div>
              </form>
    <div className="register">
        <span> Don't have an account? <Link to="/register" >Register</Link></span>
    </div>
    </div>
</div>
  )
}
