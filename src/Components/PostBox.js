import React, { useEffect, useState } from 'react'
import '../Pages/Feed/Feed.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useToast } from '@chakra-ui/react';
import { CommentModal } from './CommentModal';


export default function PostBox({user,caption,ele,userPic}) {
     const history=useHistory();
     const toast = useToast();
    
    //  console.log(ele.imageURL);
          var url=`"${ele.imageURL}"`   
        //   console.log(typeof url +" "+url);
        while(url.startsWith('"') && url.endsWith('"')){
            url=url.slice(1,-1);
        }
        // console.log(url);
    const imgurl=(ele.imageURL)?(url):"https://static.vecteezy.com/system/resources/previews/012/942/784/non_2x/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg";
    const [isUpvoted, setIsUpvoted] = useState(-1);
    const [isDownvoted, setIsDownvoted] = useState(-1);
    const [upvoteLen, setUpvoteLen] = useState(0);
    const [downvoteLen, setDownvoteLen] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (ele && ele.upvote && ele.downvote) {
            const isUserUpvoted = ele.upvote.includes(user.userId);
            if(isUserUpvoted){
                setIsUpvoted(ele.upvote.length-1);
            }
            const isUserDownvoted = ele.downvote.includes(user.userId);
            if(isUserDownvoted){
                setIsDownvoted(ele.downvote.length-1);
            }
            setUpvoteLen(ele.upvote.length);
            setDownvoteLen(ele.downvote.length);
        }

    }, [])


    const UpvoteButton = ({ele, isUpvoted, setIsUpvoted, setIsDownvoted, setUpvoteLen, setDownvoteLen}) => {
        async function upvotePost(e) {
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/post/upvote/${ele._id}`, {
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
                setIsUpvoted(res.isUpvoted);
                setIsDownvoted(res.isDownvoted);
                setUpvoteLen(res.data.upvote.length);
                setDownvoteLen(res.data.downvote.length);
              
            } else {
                // alert("Error Occured" + res.message);
                toast({
                    title: "Error Occured" + res.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }


        return(
            <>
                <button onClick={upvotePost}><b className={(isUpvoted === -1) ? "uil uil-thumbs-up btn" : "uil uil-thumbs-up btn btn-add"}>{upvoteLen}</b></button>
            </>
        )
    }

    const DownvoteButton = ({ele, setIsUpvoted, isDownvoted, setIsDownvoted, setUpvoteLen, setDownvoteLen}) => {
        async function downvotePost(e) {
            e.preventDefault();
            const response = await fetch(`http://localhost:4000/post/downvote/${ele._id}`, {
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
                setIsUpvoted(res.isUpvoted);
                setIsDownvoted(res.isDownvoted);
                setUpvoteLen(res.data.upvote.length);
                setDownvoteLen(res.data.downvote.length);
            } else {
                // alert("Error Occured" + res.message);
                toast({
                    title: "Error Occured" + res.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true,
                })
            }
        }
        
        return(
            <>
                <button onClick={downvotePost}><b className={(isDownvoted === -1) ? "uil uil-thumbs-down btn" : "uil uil-thumbs-down btn btn-add"}>{downvoteLen}</b></button>
            </>
        )
    }


    const postLink=`/feed/${ele._id}`;
    return (

            <div className="feed">
                <div className="">
                    <div className="user">
                        <div className="profile-photo">
                        <img src={`${userPic}`} alt="" />
                        </div>
                        <div className="info">
                            <h3>{ele.name}</h3>
                            {/* <small>Dubai, 15 MINUTES AGO</small> */}
                        </div>
                    </div>
                    {/* <span className="edit"><i className="uil uil-ellipsis-h"></i></span> */}
                </div>
                <div className="caption">
                    <p>{caption}
                        {/* <span className="hash-tag">#lifestyle</span> */}
                    </p>
                </div>

                <div className="photo">
                <img src={imgurl} alt="" />
                </div>



                <div className="action-buttons">
                    <div className="interaction-button">
                    <UpvoteButton ele = {ele} isUpvoted={isUpvoted} setIsUpvoted={setIsUpvoted}  setIsDownvoted={setIsDownvoted} setUpvoteLen = {setUpvoteLen} setDownvoteLen = {setDownvoteLen}/>
                    <DownvoteButton ele = {ele} setIsUpvoted={setIsUpvoted} isDownvoted={isDownvoted} setIsDownvoted={setIsDownvoted} setUpvoteLen = {setUpvoteLen} setDownvoteLen = {setDownvoteLen}/>
                    {/* <Link to={postLink} ><i className="uil uil-comment btn"></i></Link> */}
                    <i className="uil uil-comment btn" onClick={() => setIsOpen(true)}></i>
                    <CommentModal isOpen={isOpen} onClose={() => setIsOpen(false)} postId={ele._id}/>

                        {/* <!-- <span><i className="uil uil-share"></i></span> --> */}
                    </div>
                    {/* <!-- <div className="bookmark">
                                          <span><i className="uil uil-bookmark"></i></span>
                                      </div> --> */}
                </div>

          
                {/* <div className="comments text-muted">View all 130 comments</div> */}
            </div>
           
            )
}
