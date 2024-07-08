import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../../Context/ChatProvider";
import { AddIcon } from "@chakra-ui/icons";
import { ChatLoading } from "./ChatLoading";
import { getSender } from "../ChatLogic";
import { GroupChatModal } from "./GroupChatModal";

export const MyChats = ( {fetchAgain} ) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, notification, setNotification, chats, setChats} = useChat();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)   
    const toast = useToast();


    const fetchAllChats = async () => {
        try{
            const response = await fetch(`https://veilvox.onrender.com/chat/${user.userId}`);
            const res = await response.json();
            const data = res.data;
            setChats(data);
        } catch(err){
            toast({
                title: "Error occured",
                description: "Failed to load chats",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top-left"
            })
        }
    }

    useEffect(() => {
        fetchAllChats();
    }, [fetchAgain])

    return(
        <Box
        display={{base: selectedChat ? "none" : "flex", md: "flex"}}
        flexDir="column"
        p={3}
        bg="#E8E8E8"
        w={{base: "100%", md: "31%"}}
        borderRadius={10}
        borderWidth="1px"
        >

            <Box
            pb={3}
            px={3}
            fontSize={{base: "28px", mid: "30px"}}
            display="flex"
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            >
                My Chats
                <GroupChatModal>
                    <Button
                    display="flex"
                    fontSize={{base: "17px", md:"10px", lg: "17px"}}
                    rightIcon={<AddIcon />}
                    cursor="pointer"
                    >
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box
            display="flex"
            flexDir="column"
            p={3}
            bg="white"
            width="100%"
            height="150%"
            borderRadius={10}
            overflowY="hidden"
            >
                {(chats) ?  (
                    <Stack overflowY="scroll">
                        {chats.map((chat) => (
                            <Box 
                            onClick={() => setSelectedChat(chat)}
                            cursor="pointer"
                            bg={(selectedChat) === chat ? "#244166" : "#E8E8E8"}
                            color={selectedChat === chat ? "white" : "black"}
                            px={3}
                            py={2}
                            borderRadius={10}
                            key = {chat._id}
                            >
                                <Text>{(!chat.isGroupChat && chat.users) ? (getSender(user, chat.users)) : (chat.chatName)}</Text>
                            </Box>
                        ))}
                    </Stack>
                )
                : 
                (<ChatLoading />)}
            </Box>

        </Box>
    )
}

