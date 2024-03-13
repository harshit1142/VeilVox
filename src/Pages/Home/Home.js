import React from 'react'
import './styles.css'

export default function Home() {
  return (
    <div>
       <header>
        <nav>
            <div class="logo">VeilVox</div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Chat</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>Welcome to VeilVox</h1>
            <p>Your ultimate platform for anonymous chatting.</p>
            <a href="post-page.html" class="btn">Get Started</a>
        </div>
    </section>
    
    <footer>
        <p>Made with &#10084; By Team Fight Club.</p>
        {/* <!-- <p>&copy; 2024 VeilVox. All rights reserved.</p> --> */}
    </footer>
    </div>
  )
}
