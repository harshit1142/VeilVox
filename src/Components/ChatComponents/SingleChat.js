import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender } from "../ChatLogic";
import { UpdateGroupChat } from "./UpdateGroupChat";
import { Message } from "../Message/Message";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from './typing.json';

const ENDPOINT = "http://localhost:4000";
let socket, selectedChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);
    const { selectedChat, setSelectedChat, notification, setNotification } = useChat();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const [socketConneceted, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false); // to set the below variable to true when typing immediately
    const [isTyping, setIsTyping] = useState(false); // for the animatiom
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const toast = useToast();

    const fetchMessages = async () => {
        if(!selectedChat) return;
        try{
            setLoading(true);
            const response = await fetch(`http://localhost:4000/message/${selectedChat._id}`);
            const res = await response.json();
            const data = res.data;
            // basically whenever a chat room is opened, user is joined in it
            setMessages(data);
            setLoading(false);
            socket.emit('join chat', selectedChat._id);

        } catch(error){
            toast({
                title: "Error getting messages",
                description: error,
                status: "error",
                duration: 2000, 
                isClosable: true,
                position: "bottom"
            });
            }
        }

        useEffect(() => {
            socket = io(ENDPOINT);
            socket.emit('setup', user);
            socket.on('connected', ()=>setSocketConnected(true));
            socket.on('typing', ()=> setIsTyping(true))
            socket.on('stop typing', ()=> setIsTyping(false))
        }, []);
 
        useEffect(() => {
            fetchMessages();

            selectedChatCompare = selectedChat; // to decide whether to emit the message or give a notification ?
        },[selectedChat]);

        useEffect(() => {
            socket.on('message recieved', (newMessageRecieved) => {
                // if no chat is selected or the currently opened chat is different -> give notification
                if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
                    if(!notification.includes(newMessageRecieved)){
                        setNotification([newMessageRecieved, ...notification]);
                        setFetchAgain(!fetchAgain);
                    }
                }
                else{
                    setMessages([...messages, newMessageRecieved]);
                }
            })
        })


    const sendMessage = async (e) => {
        if(e.key === "Enter" && newMessage){
            socket.emit('stop typing', selectedChat._id);
            try{
                setNewMessage("");
                const response = await fetch(`http://localhost:4000/message/${selectedChat._id}`,{
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        content: newMessage,
                        userId: user.userId
                    })
                })
                const res = await response.json();
                const data = res.data;                

                socket.emit('new message', data); // sending the newMessage
                setMessages([...messages, data]); // added to all of the messages

            } catch(error){
                toast({
                    title: "Error sending message",
                    description: error,
                    status: "error",
                    duration: 2000, 
                    isClosable: true,
                    position: "bottom"
                });
            }
        }

    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if(!socketConneceted) return;
        
        if(!typing){
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timeLength = 3000;
        
        // if the time from when user has stopped typing is 3 sec -> set the typing to false
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timeLength){
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timeLength)
    }

    return(
        <>{
            
            (selectedChat) ? (
                <>
                    <Text 
                    display="flex"
                    alignItems="center"
                    fontSize={{base: "22px", md:"25px"}}
                    pb={3}
                    px={2}
                    w="100%"
                    justifyContent={{base:"space-between"}}
                    >
                        <IconButton display={{base: "flex", md:"none"}}
                        icon={<ArrowBackIcon />}
                        onClick={() => setSelectedChat("")}
                        />
                        {(!selectedChat.isGroupChat && selectedChat) ? (
                            <>
                            {getSender(user, selectedChat.users)}
                            </>
                        ): <>
                            {selectedChat.chatName}
                            <UpdateGroupChat 
                                fetchAgain={fetchAgain}
                                setFetchAgain={setFetchAgain} 
                                fetchMessages={fetchMessages}
                                />
                            </>
                        }
                    </Text>
                    <Box
                    display="flex"
                    flexDir="column"
                    justifyContent="flex-end"
                    p={3}
                    bg="#E8E8E8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                    >
                        {loading ? (<Spinner size="md" h={20} w={20} alignSelf="center" margin="auto" />) : (
                            <div style={{display:"flex", flexDirection:"column", overflowY:"scroll", scrollbarWidth:"none"}}>
                                <Message messages={messages} />
                            </div>
                        )}
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {isTyping ? <div>
                            <Lottie 
                            const options={defaultOptions}
                            width={50} 
                            style={{marginBottom: 1, marginLeft: 0}} 
                            /> 
                            </div> : <></>}
                            <Input variant="filled" placeholder="Enter the message" bg="#blue" onChange={typingHandler} value={newMessage} />
                        </FormControl>
                    </Box>
                </>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" h="100%">
                    <Text fontSize="2xl" pb={3}>Select a user to start messaging</Text>
                </Box>
            )
        }</>

    );
};

