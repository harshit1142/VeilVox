import Navbar from '../../Components/Navbar.js'
import '../Feed/Feed.css'
import './Profile'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PostBox from '../../Components/PostBox';
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from 'react-loader-spinner';
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { Avatar, Box, Button, Spinner, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useChat } from '../../Context/ChatProvider.js';
import { setUser } from '../../Redux/UserRedux.js'

const handlePostsButton = (setTab) => {
    setTab(0);
}

const handleUpvotedButton = (setTab) => {
    setTab(1);
}

const handleDownvotedButton = (setTab) => {
    setTab(2);
}

const FilterBar = ({tab, setTab}) => {


    return(
        <div className="filter-bar">
            <div className= {(tab === 0) ? ("active") : ("")} onClick={() => handlePostsButton(setTab)}>Posts</div>
            <div className={(tab === 1) ? ("active") : ("")} onClick={() => handleUpvotedButton(setTab)}>Upvoted</div>
            <div className={(tab === 2) ? ("active") : ("")} onClick={() => handleDownvotedButton(setTab)}>Downvoted</div>
        </div>

    )
}

export default function Profile() {
    const history = useHistory();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)    
    const [allPost, setAllPost] = useState([]); // the array where all the posts are concatenated
    const [page, setPage] = useState(2); // here a page referes to the batch of 5 posts
    const [hasMore, setHasMore] = useState(true); // tells whether there are more posts or not
    const { notification } = useChat();
    var { userName } = useParams();
    const [userId, setUserId] = useState();
    const [pic, setPic] = useState("");
    const [karma, setKarma] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loader, setLoader] = useState(false);
    const [changed, setChanged] = useState(false);
    const toast = useToast();
    const [create, setCreate] = useState({
        file: null,
        description: '',
        image:""
    });
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    

    useEffect(() => {
        setAllPost([]);
        setPage(2);
        fetchInitialPosts();
        fetchUserData();
    }, [userName, tab])

    const fetchInitialPosts = async () => {
        try{
            const response = await fetch(`http://localhost:4000/post/profile/${userName}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    page: 1,
                    tab: tab
                })
            });
            
            const res = await response.json();
            
            if (res.data.length === 0) {
                setHasMore(false); // No more posts available
            } else {
                setAllPost(prevPosts => [...prevPosts, ...res.data]);
                setPage(prevPage => prevPage + 1); // Increment the page number
            }
        } catch(err){
            console.log("error: "+err);
        }
    };

    const fetchMorePosts = async () => {
        try{
            const response = await fetch(`http://localhost:4000/post/profile/${userName}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    page: page,
                    tab: tab
                })
            });
            
            const res = await response.json();
            
            if (res.data.length === 0) {
                setHasMore(false); // No more posts available
            } else {
                setAllPost(prevPosts => [...prevPosts, ...res.data]);
                setPage(prevPage => prevPage + 1); // Increment the page number
            }
        } catch(err){
            console.log("error: "+err);
        }
    };

    const fetchUserData = async () => {
        try{
            const response = await fetch(`http://localhost:4000/post/profile/${userName}`);
            const res = await response.json();
            setUserId(res._id);
            setPic(res.pic);
            setKarma(res.upvote-res.downvote);
        } catch(err){
            console.log("error: "+err);
        }

    }
   

    if ((user === null || user.name === "")) {
        return history.push("/login");

    }

    function handleChange(e) {
        if (e.target.name === 'file') {
          const file = e.target.files[0];
          setCreate({ ...create, "file": file });
          setChanged(true);
        } else {
          setCreate({ ...create, [e.target.name]: e.target.value });
          setChanged(true);
        }
    }

    const handleClick = () => {
        userName = user.name;
        history.push(`/profile/${user.name}`);
    }

    async function handleSubmit() {
        // setLoader(true);
        if (!create.file) {
          // alert('Invalid Response!! Please select an image and add a description.');
          toast({
            title: 'Please select an image',
            status: 'warning',
            duration: 2000,
            isClosable: true,
        })
          setLoader(false);
          return;
        }
        sendFile();
        onClose();   
    }

    async function sendFile() {
        const formData = new FormData();
        formData.append('file', create.file);
    
        try {
            const response = await fetch('http://localhost:4000/uploads/', {
                method: 'POST',
                body: formData
            });
            
            const res = await response.json();
            localStorage.setItem('image', res.data);
            sendPic();
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Error occurred while uploading the file',
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setLoader(false);
        }
    }

    async function sendPic() {
        const url = localStorage.getItem('image');
        const response = await fetch(`http://localhost:4000/auth/${user.name}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                newPic: url
            })
        });
        localStorage.removeItem('image');
        const res = await response.json();
        setChanged(false);
        setPic(url);
        dispatch(setUser(res.user));

        if (res.status === 201) {
            toast({
                title: "Profile Photo changed successfully",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            setLoader(false);
            setChanged(false);
        } else {
            console.log(res.message);
            toast({
                title: "Error Occurred: " + res.message,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
            setLoader(false);
            // onClose();
        }
    }


    const UserBox = ({userName, pic, karma}) => {


        return(
        <div className='user-data'>
            <div className='profile-photo-container'>
            <Tooltip label= {(user.userId === userId) ? 'Edit profile picture' : ''}>
                {(loader) ? (<div style={{display:"flex", justifyContent:"center", alignItems: "center"}}><Spinner size='lg' /></div>) 
                : (<Avatar size='lg' cursor= {(user.userId === userId) ? ("pointer") : ("")} ml={2} name={userName} src={pic} 
                onClick={(user.userId === userId) ? onOpen : onClose} />)}
                
            </Tooltip>  
            {user.userId === userId && (
                    <input
                        type='file'
                        id='uploadPic'
                        name='file'
                        onChange={handleChange}
                        accept='image/*'
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer'
                        }}
                    />
                )}
            <Modal isOpen={isOpen} onClose={onClose} size="sm">
                <ModalOverlay />
                <ModalContent>
                <ModalHeader display="flex" justifyContent="center" alignItems="center">Edit Profile Picture</ModalHeader>
                {/* <ModalCloseButton /> */}
                <ModalBody>
                    
                </ModalBody>

                {/* <ModalFooter> */}
                <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                    {(!changed) ? (<Button colorScheme='blue' w="100%" cursor="pointer" borderRadius={0} onClick={() => {
                        document.getElementById('uploadPic').click();
                        // onClose();   
                        }}>
                        Select new Photo
                    </Button>) : (
                        <Button colorScheme='green' w="100%" cursor="pointer" borderRadius={0} onClick={() => {
                            setLoader(true);
                            setChanged(true);
                            handleSubmit();
                            // document.getElementById('uploadPic').click();
                            // onClose();   
                            }}>
                            Upload
                        </Button>
                    )}
                    
                    {/* <Button colorScheme='blue' mr={3}  w="100%">
                        Remove current photo
                    </Button> */}
                    <Button colorScheme='red' w="100%" cursor="pointer" onClick={onClose} borderRadius={0}>
                        Close
                    </Button>
                </Box>
                {/* </ModalFooter> */}
                </ModalContent>
        </Modal>
            </div>
            <div className='user-details' style={{display: "block", marginLeft: "7px", marginTop:"15px"}}>
                <h3>{userName}</h3>
                <div style ={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px"}}>
                    <span style={{fontWeight:"bold", fontSize:"0.9rem"}}>{karma} Karma</span>
                </div>
                
            </div>
        </div>
        )
    }


    return (
        <div >
            <Navbar />
            <main>
                <div className="container">
                    {/* <!---=================Left=================--> */}
                    <div className="left text-dark">
                            <div className="profile"  onClick={handleClick} style={{
                                marginBottom: "10px",
                                marginTop: "17px",
                                cursor: "pointer",
                                background: (user.userId === userId) ? "#F0EEF6" : "white"
                            }}>
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
                            </div>


                        {/* <!----------------------SideBar--------------> */}
                        <div className="sidebar">
                            <Link to="/feeds" className="menu-item ll">
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
                    </div>

                    {/* <!---=================Middle=================--> */}
                    <div className="middle">
                        
                        <UserBox userName={userName} pic={pic} karma={karma} />
                        <hr />

                        {/* <form className="create-post">
                            <div className="profile-photo">
                                <img src={user.pic} />
                            </div>
                            <input type="text" placeholder="What's on your mind, Diana" id="create-post" />
                            <input type="submit" value="Post" className="btn btn-primary" />
                        </form> */}

                        {/* <!----------------------Feeds--------------------> */}
                        <FilterBar tab={tab} setTab={setTab} />
                        
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
                                  {/* <b>Yay! You have seen it all</b> */}
                                </p>
                            }
                            scrollableTarget="scrollableDiv"
                        >
                        

                        <div className="feeds">

                            { allPost && allPost.map((ele) => {    
                                return <PostBox user={user} caption={ele.caption} ele={ele} key={ele._id} userPic = {(user.userId === userId && tab === 0)  ? (pic) : (ele.userPic)}/>
                            })}
                        </div>

                        </InfiniteScroll>
                    </div>
                </div>
            </main>

        </div>
    )
}
