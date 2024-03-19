
import Navbar from '../../Components/Navbar'
import './Feed.css'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostBox from '../../Components/PostBox';

export default function Feed() {
    const history = useHistory();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)
    const [allPost, setAllPost] = useState([]);
    

    useEffect(() => {
        getAllPost();
    }, [])

    async function getAllPost() {
        const response = await fetch("http://localhost:4000/post")
        const res = await response.json();
        setAllPost(res);
    }
    // async function getUserPost() {
    //     const response = await fetch(`http://localhost:4000/post/${user.userId}`)
    //     const res = await response.json();
    //     setUserPosts(res);
    // }
   
    async function upvotePost(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/post/upvote/postId`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userid: user.userId
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Upvoted Successfully!!");
            // history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }
    async function downvotePost(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/post/downvote/postId`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userid: user.userId
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Downvoted Successfully!!");
            // history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }

    if ((user === null || user.name === "")) {
        return history.push("/login");

    }





    return (
        <div >
            <Navbar />
            <main >
                <div className="container">
                    {/* <!---=================Left=================--> */}
                    <div className="left text-dark">
                        <a className="profile">
                            <div className="profile-photo">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" />
                            </div>
                            <div className="handle ">
                                <h4>{user.name}</h4>
                                <p className="text-muted">
                                    {/* {user.userId} */}
                                </p>
                            </div>
                        </a>

                        {/* <!----------------------SideBar--------------> */}
                        <div className="sidebar">
                            <Link to="/feeds" className="menu-item active">
                                <span><i className="uil uil-home"></i></span>
                                <h3>Home</h3>
                            </Link>

                            {/* <a className="menu-item">
                                <span><i className="uil uil-compass"></i></span>
                                <h3>Explore</h3>
                            </a> */}

                            <a className="menu-item ll" id="messages-notifications">
                                <span><i className="uil uil-envelope"></i></span>
                                <h3>Message</h3>
                            </a>

                            <a className="menu-item ll" id="theme">
                                <span><i className="uil uil-palette"></i></span>
                                <h3>Theme</h3>
                            </a>

                            {/* <a className="menu-item">
                                <span><i className="uil uil-setting"></i></span>
                                <h3>Settings</h3>
                            </a> */}
                        </div>

                        <Link to="/create/post" className="btn btn-primary" for="create-post">Create Post</Link>
                    </div>

                    {/* <!---=================Middle=================--> */}
                    <div className="middle">
                        {/* <!-- <div className="stories">
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-8.jpg" alt="" />
                          </div>
                          <p className="name">Your Story</p>
                      </div>
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-9.jpg" alt="">
                          </div>
                          <p className="name">Lilla James</p>
                      </div>
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-2.jpg" alt="">
                          </div>
                          <p className="name">Jasmine Singh</p>
                      </div>
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-3.jpg" alt="">
                          </div>
                          <p className="name">Celina Fernandes</p>
                      </div>
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-4.jpg" alt="">
                          </div>
                          <p className="name">Mia Addams</p>
                      </div>
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-5.jpg" alt="">
                          </div>
                          <p className="name">Christy Kahea</p>
                      </div>
                  </div> --> */}

                        {/* <form className="create-post">
                            <div className="profile-photo">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" />
                            </div>
                            <input type="text" placeholder="What's on your mind, Diana" id="create-post" />
                            <input type="submit" value="Post" className="btn btn-primary" />
                        </form> */}


                        {/* <!----------------------Feeds--------------------> */}

                        <div className="feeds">

                            { allPost && allPost.map((ele, ind) => {
                                return <PostBox user={user} caption={ele.caption} ele={ele} key={ele._id}/>
                            })}
                        </div>
                    </div>

                    {/* <!---=================Right=================-->
                      <!-- <div className="right">
                          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure illum natus praesentium perferendis
                          quidem explicabo, officia consequuntur perspiciatis. Autem pariatur quis quos quod cupiditate id
                          corrupti soluta nulla voluptates neque.
                      </div> --> */}

                </div>
            </main>

            <div className="customize-theme">
                <div className="card">
                    <h2>Customize Your View</h2>
                    <p>Manage your font size, color, and background.</p>

                    {/* <!-----------------Font Size---------------> */}
                    <div className="font-size">
                        <h4>Font Size</h4>
                        <div>
                            <h6>Aa</h6>
                            <div className="choose-size">
                                <span className="font-size-1"></span>
                                <span className="font-size-2 "></span>
                                <span className="font-size-3 active"></span>
                                <span className="font-size-4"></span>
                                <span className="font-size-5"></span>
                            </div>
                            <h3>Aa</h3>
                        </div>
                    </div>

                    {/* <!-----------------------Primary Colors------------------> */}
                    <div className="color">
                        <h4>Color</h4>
                        <div className="choose-color">
                            <span className="color-1 active"></span>
                            <span className="color-2"></span>
                            <span className="color-3"></span>
                            <span className="color-4"></span>
                            <span className="color-5"></span>
                        </div>
                    </div>

                    {/* <!-----------------Background Color---------------------> */}
                    <div className="background">
                        <h4>Background</h4>
                        <div className="choose-bg">
                            <div className="bg-1 active">
                                <span></span>
                                <h5 for="bg-1">Light</h5>
                            </div>

                            <div className="bg-2">
                                <span></span>
                                <h5 for="bg-2">Dim</h5>
                            </div>

                            <div className="bg-3">
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
