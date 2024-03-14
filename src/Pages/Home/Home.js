import React from 'react'
import './styles.css'

import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Home() {
  return (
    <div className='main'>
       <header>
        <nav>
            <div className="logo">VeilVox</div>
            <ul>
                {/* <li><Link to="#home"  className="nav-link">Home</Link></li> */}
                {/* <li><Link to="/chat" className="nav-link">Chat</Link></li> */}
                <li><Link to="#about" className="nav-link">About</Link></li>
                {/* <li><Link to="">Contact</Link></li> */}
                <li>
                <Link to="/login" className="nav-btn">Login</Link>
                </li>
            </ul>
        </nav>
    </header>

    <section className="hero">
        <div className="hero-content">
            <h1>Welcome to <b className='title'>VeilVox</b></h1>
            <p>Your ultimate Anonymous Social Platform.</p>
            <Link to="/register" className="btn">Get Started</Link>
        </div>
    </section>
    
    <footer>
        <p>Made with &#10084; By Team Fight Club.</p>
        {/* <!-- <p>&copy; 2024 VeilVox. All rights reserved.</p> --> */}
    </footer>
    </div>
  )
}
