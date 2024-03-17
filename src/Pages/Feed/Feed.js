import React from 'react'
import Navbar from '../../Components/Navbar'
import './Feed.css'

export default function Feed() {

    return (
        <div >
            <Navbar />
            <main >
                <div class="container">
                    {/* <!---=================Left=================--> */}
                    <div class="left">
                        <a class="profile">
                            <div class="profile-photo">
                                <img src="./images/profile-1.jpg" />
                            </div>
                            <div class="handle">
                                <h4>Diana Ayi</h4>
                                <p class="text-muted">
                                    @dayi
                                </p>
                            </div>
                        </a>

                        {/* <!----------------------SideBar--------------> */}
                        <div class="sidebar">
                            <a class="menu-item active">
                                <span><i class="uil uil-home"></i></span>
                                <h3>Home</h3>
                            </a>

                            <a class="menu-item">
                                <span><i class="uil uil-compass"></i></span>
                                <h3>Explore</h3>
                            </a>

                            <a class="menu-item" id="messages-notifications">
                                <span><i class="uil uil-envelope"></i></span>
                                <h3>Message</h3>
                            </a>

                            <a class="menu-item" id="theme">
                                <span><i class="uil uil-palette"></i></span>
                                <h3>Theme</h3>
                            </a>

                            <a class="menu-item">
                                <span><i class="uil uil-setting"></i></span>
                                <h3>Settings</h3>
                            </a>
                        </div>

                        <label class="btn btn-primary" for="create-post">Create Post</label>
                    </div>

                    {/* <!---=================Middle=================--> */}
                    <div class="middle">
                        {/* <!-- <div class="stories">
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-8.jpg" alt="" />
                          </div>
                          <p class="name">Your Story</p>
                      </div>
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-9.jpg" alt="">
                          </div>
                          <p class="name">Lilla James</p>
                      </div>
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-2.jpg" alt="">
                          </div>
                          <p class="name">Jasmine Singh</p>
                      </div>
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-3.jpg" alt="">
                          </div>
                          <p class="name">Celina Fernandes</p>
                      </div>
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-4.jpg" alt="">
                          </div>
                          <p class="name">Mia Addams</p>
                      </div>
                      <div class="story">
                          <div class="profile-pic">
                              <img src="./images/profile-5.jpg" alt="">
                          </div>
                          <p class="name">Christy Kahea</p>
                      </div>
                  </div> --> */}

                        <form class="create-post">
                            <div class="profile-photo">
                                <img src="images/profile-1.jpg" />
                            </div>
                            <input type="text" placeholder="What's on your mind, Diana" id="create-post" />
                            <input type="submit" value="Post" class="btn btn-primary" />
                        </form>


                        {/* <!----------------------Feeds--------------------> */}

                        <div class="feeds">

                            <div class="feed">
                                <div class="head">
                                    <div class="user">
                                        <div class="profile-photo">
                                            <img src="images/profile-13.jpg" alt="" />
                                        </div>
                                        <div class="info">
                                            <h3>Lana Rose</h3>
                                            <small>Dubai, 15 MINUTES AGO</small>
                                        </div>
                                    </div>
                                    <span class="edit"><i class="uil uil-ellipsis-h"></i></span>
                                </div>

                                <div class="photo">
                                    <img src="images/feed-1.jpg" alt="" />
                                </div>

                                <div class="action-buttons">
                                    <div class="interaction-button">
                                        <span><i class="uil uil-thumbs-up"></i></span>
                                        <span><i class="uil uil-thumbs-down"></i></span>
                                        <span><i class="uil uil-comment"></i></span>
                                        {/* <!-- <span><i class="uil uil-share"></i></span> --> */}
                                    </div>
                                    {/* <!-- <div class="bookmark">
                                          <span><i class="uil uil-bookmark"></i></span>
                                      </div> --> */}
                                </div>

                                <div class="liked-by">
                                    <span><img src="images/profile-15.jpg" /></span>
                                    <span><img src="images/profile-16.jpg" /></span>
                                    <span><img src="images/profile-17.jpg" /></span>
                                    <p>Liked by <b>Enrest Achiever</b> and <b>220 others</b></p>
                                </div>

                                <div class="caption">
                                    <p><b>Lana Rose</b>Lorem ipsum dolor storiesquiquam eius.
                                        <span class="hash-tag">#lifestyle</span>
                                    </p>
                                </div>
                                <div class="comments text-muted">View all 130 comments</div>
                            </div>






                        </div>

                    </div>

                    {/* <!---=================Right=================-->
                      <!-- <div class="right">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure illum natus praesentium perferendis
                          quidem explicabo, officia consequuntur perspiciatis. Autem pariatur quis quos quod cupiditate id
                          corrupti soluta nulla voluptates neque.
                      </div> --> */}

                </div>
            </main>

            <div class="customize-theme">
                <div class="card">
                    <h2>Customize Your View</h2>
                    <p>Manage your font size, color, and background.</p>

                    {/* <!-----------------Font Size---------------> */}
                    <div class="font-size">
                        <h4>Font Size</h4>
                        <div>
                            <h6>Aa</h6>
                            <div class="choose-size">
                                <span class="font-size-1"></span>
                                <span class="font-size-2 "></span>
                                <span class="font-size-3 active"></span>
                                <span class="font-size-4"></span>
                                <span class="font-size-5"></span>
                            </div>
                            <h3>Aa</h3>
                        </div>
                    </div>

                    {/* <!-----------------------Primary Colors------------------> */}
                    <div class="color">
                        <h4>Color</h4>
                        <div class="choose-color">
                            <span class="color-1 active"></span>
                            <span class="color-2"></span>
                            <span class="color-3"></span>
                            <span class="color-4"></span>
                            <span class="color-5"></span>
                        </div>
                    </div>

                    {/* <!-----------------Background Color---------------------> */}
                    <div class="background">
                        <h4>Background</h4>
                        <div class="choose-bg">
                            <div class="bg-1 active">
                                <span></span>
                                <h5 for="bg-1">Light</h5>
                            </div>

                            <div class="bg-2">
                                <span></span>
                                <h5 for="bg-2">Dim</h5>
                            </div>

                            <div class="bg-3">
                                <span></span>
                                <h5 for="bg-3">Dark</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
