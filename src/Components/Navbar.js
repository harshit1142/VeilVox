import React from 'react'
import '../Pages/Feed/Feed.css'

export default function Navbar() {
  return (
      <nav>
          <div class="container">
              <h2 class="logo">
                  VeilVox
              </h2>
              <div class="search-bar">
                  <i class="uil uil-search"></i>
                  <input type="search" placeholder="Search for Users,People,Creators" />
              </div>
              <div class="create">
                  {/* <!-- <label class="btn btn-primary" for="create-post">Create</label> --> */}
                  <a href="index.html" class="btn btn-primary">Logout</a>
                  <div class="profile-photo">
                      <img src="./images/profile-1.jpg" />
                  </div>
              </div>
          </div>
      </nav>
  )
}
