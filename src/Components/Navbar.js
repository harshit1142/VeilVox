import React from 'react'
import '../Pages/Feed/Feed.css'
import { removeUser } from '../Redux/UserRedux';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Navbar() {
    const dispatch = useDispatch();
    const history=useHistory();

    function logout(){
        // alert("Logout Successfully!!");
        dispatch(removeUser());
        history.push("/");
    }
  return (
      <nav>
          <div className="container">
              <h2 className="logo">
                  VeilVox
              </h2>
              <div className="search-bar">
                  <i className="uil uil-search"></i>
                  <input type="search" placeholder="Search for Users,People,Creators" />
              </div>
              <div className="create">
                  {/* <!-- <label className="btn btn-primary" for="create-post">Create</label> --> */}
                  <button  onClick={logout} className="btn btn-primary">Logout</button>
                  {/* <div className="profile-photo">
                      <img src="./images/profile-1.jpg" />
                  </div> */}
              </div>
          </div>
      </nav>
  )
}
