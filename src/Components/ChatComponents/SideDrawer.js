import { Avatar, Box, Button, Input, Spinner, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Redux/UserRedux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ChatLoading } from "./ChatLoading";
import { UserCard } from "./UserCard";
import { useChat } from "../../Context/ChatProvider";
import { getSender } from "../ChatLogic";

export const SideDrawer = () => {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)   
    const dispatch = useDispatch(); 
    const history = useHistory();

    const { selectedChat, setSelectedChat, notification, setNotification, chats, setChats } = useChat();


    function logout(){
        dispatch(removeUser());
        history.push("/");
    }

    const handleSearch = async () => {
        if(!search){
            toast({
                title: "Enter the username",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top-left"
            })
        }
        
        try{
            setLoading(true);

            const response = await fetch(`http://localhost:4000/auth/${user.userId}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    search: search
                })
            }) 
            const res = await response.json();
            const data = res.users;

            setLoading(false);
            setSearchResult(data);
        } catch(err){
            toast({
                title: "Error occured",
                description: "Failed to load the results",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top-left"
            })
        }

    }

    const fetchChat = async (userId) => {
        try{
            setLoadingChat(true);
            const response = await fetch(`http://localhost:4000/chat/${user.userId}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    otherUserId: userId
                })
            })
            const res = await response.json();
            const data = res.data;
            
            // append into chats only if it was not there before (newly created)
            if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            // setGetAdded(!getsAdded);
            onClose();
        } catch(err){
            toast({
                title: "Error fetching the chat",
                description: "Failed to load the results",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"bottom"
            })
        }

    }

    return(
        <>
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="#244166"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
            >
                <Button onClick={onOpen}>
                    <i class = "fas fa-search"></i>
                    <Text cursor="pointer" display={{base:"none", md:"flex"}} px='4'>Search User</Text>
                </Button>

                <Text fontSize="2xl"><Link to="/feeds" style={{color:"white"}}>VeilVox</Link></Text>
                <div>
                    <Menu>
                        <MenuButton p={1} borderRadius={6} cursor="pointer">
                        <NotificationBadge
                        count={notification.length}
                        effect={Effect.SCALE}
                        />
                            <BellIcon fontSize="2xl" m={1} />                        
                        
                        </MenuButton>
                        <MenuList>
                            {!notification.length && "No new messages"}
                            {notification.map((notif) => (
                                <MenuItem key={notif._id} onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => n!==notif));
                                    }}>

                                     {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}` : 
                                     `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>

                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} ml={1} borderRadius={6}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Avatar size='sm' cursor="pointer" mr={1} name={user.name} src={user.pic} /><Text>{user.name}</Text>
                        </Box>
                        </MenuButton>
                        <MenuList>
                            <MenuItem cursor="pointer" onClick={() => {history.push("/feeds")}}>Home</MenuItem>
                            <MenuDivider />
                            <MenuItem cursor="pointer" onClick={() => {history.push(`/profile/${user.name}`)}}>My Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem cursor="pointer" onClick={logout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px" backgroundColor="#244166" color="white">Search users to chat</DrawerHeader>
                    <DrawerBody>
                        {/* // input Box */}
                        <Box
                        display="flex"
                        pb={2}
                        >
                            <Input placeholder="Enter the username" mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Button onClick={handleSearch}>Search</Button>
                        </Box>
                        {(loading) ? (<ChatLoading />) : (
                            searchResult?.map(newUser => (
                                <UserCard key={newUser._id} user={newUser} handleFunction={() => fetchChat(newUser._id)} />
                            ))
                        )}
                        {loadingChat && <Spinner ml="auto" display="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}


