import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import "./login.css"
import { setUser } from '../../Redux/UserRedux';


export default function Register() {
    const history=useHistory();
    const dispatch = useDispatch();
    
    const [data, setData] = useState({
        user: "",
        password: ""
    })

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e){
        e.preventDefault();
        const response = await fetch("http://localhost:4000/auth/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name:data.user,
                password:data.password
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Registered Successfully!!");
            dispatch(setUser(res.user));
            history.push("/main");

        } else {
            if (res.message.indexOf("E11000")) alert("User Already Exist!!")
            else
            alert(res.message);
        }
    }

  return (
      <div className="wrapper">
          <div className="login_box">
              <div className="login-header">
                  <span> Register </span>
              </div>
              <form>
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
                  <input type="submit" onClick={handleSubmit} className="input-submit" value="Register" />
              </div>
              </form>
              <div className="register">
                  <span> Already have an account? <Link to="/login" >Login</Link></span>
              </div>
          </div>
      </div>
  )
}
