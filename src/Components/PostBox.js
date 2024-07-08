import React, { useEffect, useState } from 'react'
import '../Pages/Feed/Feed.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, useDisclosure, useToast } from '@chakra-ui/react';
import { CommentModal } from './CommentModal';
import { getTimeString } from './timeLogicPost';
import { DeleteIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

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
    const [isOpenC, setIsOpen] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()

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
            const response = await fetch(`https://veilvox.onrender.com/post/upvote/${ele._id}`, {
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
            const response = await fetch(`https://veilvox.onrender.com/post/downvote/${ele._id}`, {
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

    const handleDelete = async () => {
        onClose();
        try{
            const response = await fetch(`https://veilvox.onrender.com/post/${ele._id}`,{
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userName: ele.name
                })
            })
            const res = await response.json();
            if(res.status === 200){
                toast({
                    title: 'Post will be deleted',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }
        } catch(err){
            console.log("error: "+err);
        }

    }


    return (

            <div className="feed">
                <div className="">
                    <div className="user">
                        <div>
                            {/* <img src={`${userPic}`} alt="" /> */}
                            <Avatar size='md' ml={1} name={ele.name} src={userPic} />
                        </div>
                        <div className="info">
                            <h3><Link to={`/profile/${ele.name}`} style={{color:"black"}}>{ele.name}</Link></h3>
                            <small>{getTimeString(ele.timestamp)}</small>
                        </div>  
                        <div className="edit" style={{marginLeft:"auto"}}>
                            {(user.name === ele.name) ? (<Menu>
                                <MenuButton backgroundColor="white" cursor="pointer">
                                    <i className="uil uil-ellipsis-h"></i>
                                </MenuButton>
                                    <MenuList borderRadius={6} p={1} minW="0" w={'157px'}>
                                        <MenuItem cursor="pointer" borderRadius={5} width="150px" onClick={onOpen}>Delete Post<DeleteIcon marginLeft="auto" /></MenuItem>
                                    </MenuList>
                            </Menu>) : (<></>)}
                            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                                <ModalContent>
                                {/* <ModalHeader>Are you sure you want to delete the Post?</ModalHeader> */}
                                <ModalCloseButton cursor="pointer" />
                                <ModalBody p={5}>
                                    Are you sure you want to delete the Post?
                                </ModalBody>

                                {/* <ModalFooter> */}
                                <Box display="flex" flexDir="column">
                                    <Button colorScheme='red' mr={3} w="100%" borderRadius={0} cursor="pointer"
                                    onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button colorScheme='blue' mr={3} w="100%" borderRadius={0} cursor="pointer"
                                    onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                {/* </ModalFooter> */}
                                </Box>
                                </ModalContent>
                            </Modal>
                        </div>
                    </div>
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
                    <CommentModal isOpen={isOpenC} onClose={() => setIsOpen(false)} postId={ele._id}/>

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
