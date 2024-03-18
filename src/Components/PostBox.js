import React from 'react'
import '../Pages/Feed/Feed.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function PostBox({user,caption,ele}) {


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
            alert("Upvoted Successfully!!");
            // history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }

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
            alert("Downvoted Successfully!!");
            // history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }

    const postLink=`/feed/${ele._id}`;
    return (

            <div className="feed">
                <div className="">
                    <div className="user">
                        <div className="profile-photo">
                        <img src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg" alt="" />
                        </div>
                        <div className="info">
                            <h3>{user.name}</h3>
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
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT83d12zUgnQ-vm5x8vqDq3j8mscMaxf18_BXTubhb3hcNBjfP5Ek7gzUtPnF9KuWcRvqVV" alt="" />
                </div>


                <div className="action-buttons">
                    <div className="interaction-button">
                    <button onClick={upvotePost}><i className="uil uil-thumbs-up btn"></i></button>
                    <button onClick={downvotePost}><i className="uil uil-thumbs-down btn"></i></button>
                    <Link to={postLink} ><i className="uil uil-comment btn"></i></Link>
                        {/* <!-- <span><i className="uil uil-share"></i></span> --> */}
                    </div>
                    {/* <!-- <div className="bookmark">
                                          <span><i className="uil uil-bookmark"></i></span>
                                      </div> --> */}
                </div>

                 <div className="liked-by">
                    
                <p>Upvoted by <b>{ele.upvote && ele.upvote.length}</b> and Downvoted by <b>{ele.downvote && ele.downvote.length}</b></p>
                </div> 

          
                {/* <div className="comments text-muted">View all 130 comments</div> */}
            </div>
           
            )
}
