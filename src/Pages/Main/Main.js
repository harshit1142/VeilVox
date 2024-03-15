import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Main() {
  const history=useHistory();
  const selectUser = (state) => state.UserReducer.user;
  const user=useSelector(selectUser)
  const [allPost,setAllPost]=useState([]);
  const [userPosts,setUserPosts]=useState([]);

 async function getAllPost(){
   const response = await fetch("http://localhost:4000/post")
   const res = await response.json();
   setAllPost(res);
 }
 async function getUserPost(){
   const response = await fetch(`http://localhost:4000/post/${user.userId}`)
   const res = await response.json();
   setUserPosts(res);
 }
 async function getCommentReply(){
   const response = await fetch(`http://localhost:4000/reply/commentId`)
   const res = await response.json();
 }
 async function postComment(e){
    e.preventDefault();
   const response = await fetch(`http://localhost:4000/post/${user.userId}`, {
     method: "POST",
     headers: {
       "content-type": "application/json"
     },
     body: JSON.stringify({
      //  caption: input.caption,
      //  imageURL: input.imageURL
     })
   })
   const res = await response.json();
   if (res.status === 201) {
     alert("Posted Successfully!!");
     history.push("/main");
   } else {
     alert("Error Occured" + res.message);
   }
 }

 async function postReply(e){
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

  if ((user===null || user.name === "")) {
    history.push("/login");
  }

  useEffect(()=>{
    getAllPost();
    getUserPost();
  },[])


  return (
    <div>
      <div>
        <h1>ALL POSTS</h1>
      </div>
    </div>
  )
}
