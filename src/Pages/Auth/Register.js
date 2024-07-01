import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import "./login.css"
import { setUser } from '../../Redux/UserRedux';
import { useToast } from '@chakra-ui/react';


export default function Register() {
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
    const history=useHistory();
    const dispatch = useDispatch();
    const toast = useToast();
    
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
            // alert("Registered Successfully!!");
            toast({
                title: "Registered Successfully!!",
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
            dispatch(setUser(res.data));
            history.push("/feeds");

        } else {
            if (res.message.indexOf("E11000")){
                // alert("User Already Exist!!")
                // console.log(res);
                if(res.status === 400){
                    toast({
                        title: res.message,
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }
                else{
                    toast({
                        title: "User Already Exists!!",
                        status: 'warning',
                        duration: 2000,
                        isClosable: true,
                    })
                }
            }
            else{
                // alert(res.message);
                toast({
                    title: res.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
    }

    if (!(user === null || user.name === "")) {
        return history.push("/feeds");
    }
    

  return (
      <div className="wrapper">
          <div className="login_box">
              <div className="login-header">
                  <span> Register </span>
              </div>
              <form>
              <div className="input_box">
                  <input type="text" id="user" name="user" autoComplete="off" value={data.user} onChange={handleChange} className="input-field" required />
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
