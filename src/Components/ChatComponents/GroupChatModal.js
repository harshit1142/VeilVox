import { Box, Button, FormControl, Input, useDisclosure, useToast } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import React, { useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChat } from "../../Context/ChatProvider";
import { UserCard } from "./UserCard";
import { UserBadge } from "./UserBadge";

export const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)   
    const { chats, setChats } = useChat();
    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        }
        try{
            setLoading(true);
            const response = await fetch(`https://veilvox.onrender.com/auth/${user.userId}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    search: query
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
                position:"top"
            })
        }

    }

    const handleGroup = (user) => {
        if(selectUsers.includes(user)){
            toast({
                title: "User already added",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top"
            });
            return;
        }

        setSelectedUsers([...selectUsers, user]);
    }

    const handleSubmit = async () => {
        if(!groupChatName || !selectUsers){
            toast({
                title: "Please enter all the fields",
                status: 'warning',
                duration: 2000,
                isClosable: true,
                position:"top"
            });
        }
        try{
            const response = await fetch(`https://veilvox.onrender.com/chat/group/${user.userId}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    chatName: groupChatName,
                    users: JSON.stringify(selectUsers.map((u) => u._id))
                })
            })
            const res = await response.json();
            const data = res.data;

            setChats([data, ...chats]);
            onClose();
            toast({
                title: "New group chat created",
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:"bottom"
            });
            return;

        } catch(err){
            toast({
                title: "Error creating group chat",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:"top"
            });
            console.log("error: "+err);
        }

    }

    const handleDelete = (user) => {
        setSelectedUsers(selectUsers.filter((sel) => sel._id !== user._id));

    }


    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent display="flex">
              <ModalHeader
                display="flex"
                justifyContent="center"
                fontSize="35px"
              >Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody
              display="flex"
              flexDirection="column"
              alignItems="center"
            //   mb={20}
              >
                <FormControl>
                    <Input placeholder="Chat Name" mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <Input placeholder="Enter Username" mb={1} onChange={(e) => handleSearch(e.target.value)} />
                    <Box w="100%" display="flex" flexWrap="wrap">
                        {selectUsers.map((u) => (
                            <UserBadge key={u._id} user={u} handleDelete={() => handleDelete(u)} />
                        ))}
                    </Box>


                    {(loading) ? <div>loading...</div> : (
                        searchResult?.slice(0, 4).map(user => ( // to display only top five results
                            <UserCard key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                        ))
                    )}

                </FormControl>
              </ModalBody>
    
              {/* <ModalFooter> */}
                <Button colorScheme='blue' onClick={handleSubmit} width="50%" margin={7}>
                  Create Chat
                </Button>
              {/* </ModalFooter> */}
            </ModalContent>
          </Modal>
        </>
      )
}
