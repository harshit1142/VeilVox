
import Navbar from '../../Components/Navbar.js'
import './Feed.css'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PostBox from '../../Components/PostBox';
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { Avatar, background, Button } from '@chakra-ui/react';
import { useChat } from '../../Context/ChatProvider.js';
import { color } from 'framer-motion';
import { AddIcon } from '@chakra-ui/icons';

export default function Feed() {
    const history = useHistory();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)    
    const [allPost, setAllPost] = useState([]); // the array where all the posts are concatenated
    const[page, setPage] = useState(1); // here a page referes to the batch of 5 posts
    const [hasMore, setHasMore] = useState(true); // tells whether there are more posts or not
    const { notification } = useChat();
    

    useEffect(() => {
        fetchMorePosts();
    }, [])

    const fetchMorePosts = async () => {
        try{
            const response = await fetch(`https://veilvox.onrender.com/post/page/${page}`);
            
            const res = await response.json();
            
            if (res.data.length === 0) {
                setHasMore(false); // No more posts available
            } else {
                setAllPost(prevPosts => [...prevPosts, ...res.data]);
                setPage(prevPage => prevPage + 1); // Increment the page number
            }
        } catch(err){
            console.log("error"+err);
        }
    };
   

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
                        <Link to={`/profile/${user.name}`} className="profile" style = {{ marginBottom:"10px", marginTop: "17px"}}>
                            <div>
                                {/* <img src= {`${user.pic}`} /> */}
                                <Avatar size='md' ml={1} name={user.name} src={user.pic} />
                            </div>
                            <div className="handle">
                                <h4>{user.name}</h4>
                                <p className="text-muted">
                                    {/* {user.userId} */}
                                </p>
                            </div>
                        </Link>

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
                            
                            <Link to="/chat" className="menu-item ll" id="messages-notifications">
                                <div style={{display:"flex", justifyContent:"center", alignItems:'center'}}>
                                        <span><i className="uil-envelope">
                                            <NotificationBadge
                                            count={notification.length}
                                            effect={Effect.SCALE}
                                            />
                                        </i></span>
                                        <h3>Message</h3>
                               </div>
                            </Link>
                            

                            {/* <Link className="menu-item ll" id="theme">
                                <span><i className="uil uil-palette"></i></span>
                                <h3>Theme</h3>
                            </Link>  */}

                            {/* <a className="menu-item">
                                <span><i className="uil uil-setting"></i></span>
                                <h3>Settings</h3>
                            </a> */}
                        </div>

                        <Link to="/create/post" className="btn btn-primary" for="create-post">Create Post</Link>
                        <Link to="/create/post"><div className='btn btn-primary' id='responsive-div2'><AddIcon size="lg" /></div></Link>
                    </div>

                    {/* <!---=================Middle=================--> */}
                    <div className="middle">
                      

                        {/* <form className="create-post">
                            <div className="profile-photo">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" />
                            </div>
                            <input type="text" placeholder="What's on your mind, Diana" id="create-post" />
                            <input type="submit" value="Post" className="btn btn-primary" />
                        </form> */}


                        {/* <!----------------------Feeds--------------------> */}
                        <InfiniteScroll
                            dataLength={allPost.length}
                            next={fetchMorePosts}
                            hasMore={hasMore}
                            loader={<div className='loader-class'><ThreeDots
                                visible={true}
                                height="60"
                                width="60"
                                color="#244166"
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                /></div>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                  <b>Yay! You have seen it all</b>
                                </p>
                            }
                            scrollableTarget="scrollableDiv"
                        >
                        

                        <div className="feeds">

                            { allPost && allPost.map((ele) => {    
                                return <PostBox user={user} caption={ele.caption} ele={ele} key={ele._id} userPic = {ele.userPic}/>
                            })}
                        </div>

                        </InfiniteScroll>
                    </div>

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
                    {/* <div className="background">
                        <h4>Background</h4>
                        <div className="choose-bg">
                            <div className="bg-1 active">
                                <span></span>
                                <h5 ">Light</h5>
                            </div>

                            <div className="bg-2">
                                <span></span>
                                <h5>Dim</h5>
                            </div>

                            <div className="bg-3">
                                <span></span>
                                <h5>Dark</h5>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}
