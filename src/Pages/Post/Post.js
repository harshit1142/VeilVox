
import './Post.css'
import Navbar from '../../Components/Navbar'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PostBox from '../../Components/PostBox';


export default function Post() {
    const { postId } = useParams();
    const history = useHistory();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
    const [post, setPost] = useState([])
    const [input,setInput]=useState("")

    useEffect(() => {
        getPost();

    }, [])
  

    async function getPost() {
        const response = await fetch(`http://localhost:4000/post/single/${postId}`)
        const res = await response.json();
        setPost(res.data);
    }

    async function getCommentReply() {
        const response = await fetch(`http://localhost:4000/reply/commentId`)
        const res = await response.json();
    }
    async function postComment(e) {
       
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/comment/${postId}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                userId:user.userId,
                content: input
            })
        })
        const res = await response.json();
        if (res.status === 201) {
            window.location.reload();
        } else {
            alert("Error Occured" + res.message);
        }
    }

    async function postReply(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/reply/commentId`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: user.name,
                userId: user.userId,
                //  reply:input.reply,

            })
        })
        const res = await response.json();
        if (res.status === 201) {
            alert("Replied Successfully!!");
            //  history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }


    return (
        <div>
            <Navbar />
            <main>
                <div className="container">
                    {/* <!---=================Left=================--> */}
                    <div className="left">
                        <a className="profile">
                            <div className="profile-photo">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" />
                            </div>
                            <div className="handle">
                                <h4>{user.name}</h4>
                                <p className="text-muted">

                                </p>
                            </div>
                        </a>

                        {/* <!----------------------SideBar--------------> */}
                        <div className="sidebar">
                            <Link to="/feeds" className="menu-item active">
                                <span><i className="uil uil-home"></i></span>
                                <h3>Home</h3>
                            </Link>
{/* 
                            <a className="menu-item">
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
{/* 
                            <a className="menu-item">
                                <span><i className="uil uil-setting"></i></span>
                                <h3>Settings</h3>
                            </a> */}
                        </div>

                        <label className="btn btn-primary" for="create-post">Create Post</label>
                    </div>

                    {/* <!---=================Middle=================--> */}
                    <div className="middle">
                        {/* <!-- <div className="stories">
                      <div className="story">
                          <div className="profile-pic">
                              <img src="./images/profile-8.jpg" alt="">
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

                        {/* <!-- <form className="create-post">
                      <div className="profile-photo">
                          <img src="images/profile-1.jpg">
                      </div>
                      <input type="text" placeholder="What's on your mind, Diana" id="create-post">
                          <input type="submit" value="Post" className="btn btn-primary">
                          </form> --> */}


                        {/* <!----------------------Feeds--------------------> */}

                        <div className="feeds">

                            <PostBox user={user} caption={post.caption} ele={post} />

                           {post && post.comment &&  post.comment.map((ele)=>{
                               return <div className='com'>
                                   <h4>{ele.name} :</h4>
                                   <p>{ele.content}</p>
                               </div>
                              })}


                           
                            



                        </div>

                    </div>

                

                    {/* <!---=================Right=================--> */}
                    <div className="right middle">
                        {/* <div classNameName="container-fluid comment container">
                           
                        </div> */}
                       

                        <template className="reply-input-template">
                            <div className="reply-input container">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" alt="" className="usr-img" />
                                <textarea className="cmnt-input" name="input " value={input} placeholder="Add a comment..."></textarea>
                                <button className="bu-primary" onClick={postComment}>SEND</button>
                            </div>
                        </template>

                        <template className="comment-template">
                            <div className="comment-wrp">
                                <div className="comment container">
                                    <div className="c-score">
                                        <img src="images/icon-plus.svg" alt="plus" className="score-control score-plus" />
                                        <p className="score-number">5</p>
                                        <img src="images/icon-minus.svg" alt="minus" className="score-control score-minus" />
                                    </div>
                                    <div className="c-controls">
                                        <a className="delete"><img src="images/icon-delete.svg" alt=""
                                            className="control-icon" />Delete</a>
                                        <a className="edit"><img src="images/icon-edit.svg" alt="" className="control-icon" />Edit</a>
                                        <a className="reply"><img src="images/icon-reply.svg" alt="" className="control-icon" />Reply</a>
                                    </div>
                                    <div className="c-user">
                                        <img src="images/avatars/image-maxblagun.webp" alt="" className="usr-img" />
                                        <p className="usr-name">maxblagun</p>
                                        <p className="cmnt-at">2 weeks ago</p>
                                    </div>
                                    <p className="c-text">
                                        <span className="reply-to"></span>
                                        <span className="c-body"></span>
                                    </p>
                                </div>
                                <div className="replies comments-wrp">
                                </div>
                            </div>
                        </template>

                        <div className="commentmain">
                        
                            <div className="comment-section">

                                <div className="comments-wrp">
                                    
                                   
                                </div>
                                <div className="reply-input container">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjUEKPW1-5gUq438DWHOePDHplsx2do3AHp9fdEktTfg&s" alt="" className="usr-img" />
                                    <textarea className="cmnt-input" name="input " onChange={(e)=>setInput(e.target.value)} placeholder="Add a comment..."></textarea>
                                    <button className="bu-primary" onClick={postComment}>ADD</button>
                                </div>
                            </div>

                            {/* <!-- <div className="modal-wrp invisible">
                                  <div className="modal container">
                                      <h3>Delete comment</h3>
                                      <p>Are you sure you want to delete this comment? This will remove the comment and cant be
                                          undone</p>
                                      <button className="yes">YES,DELETE</button>
                                      <button className="no">NO,CANCEL</button>
                                  </div>
                              </div> --> */}
                        </div>

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
