import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Button,
    useToast,
    Box,
    FormControl,
    Input,
    Spinner,
} from '@chakra-ui/react';
import { ViewIcon } from "@chakra-ui/icons";
import { useChat } from "../../Context/ChatProvider";
import { useSelector } from "react-redux";
import { UserBadge } from "./UserBadge";
import { UserCard } from "./UserCard";

export const UpdateGroupChat = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { selectedChat, setSelectedChat } = useChat();
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser)   
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();

   // add the user to group(if admin)
    const handleAdd = async (user1) => {  
      console.log("entered");
      if(selectedChat.users.find((u) => user1._id === u._id)){
        toast({
          title: "User already in the group",
          status: "warning",
          duration: 2000, 
          isClosable: true,
          position: "top"
      })
      return;
      };

      if(selectedChat.groupAdmin._id !== user.userId){
        toast({
          title: "Only admin can add users to the group",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top"
      })
      return;
      }
      console.log("chatId: "+selectedChat._id);
      console.log("userr: "+user1._id);

      try{
        setLoading(true);
        const response = await fetch(`https://veilvox.onrender.com/chat/group/add`, {
          method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    newUserId: user1._id
              })
        })
        const res = await response.json();
        const data = res.data;
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } catch(err){
        toast({
          title: "error: "+err,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
      })
      setLoading(false);
      }
      setGroupChatName("");
    }

    // remove the user from group(if admin)
    const handleDelete = async (user1) => {
      if(selectedChat.groupAdmin._id !== user.userId && user1._id !== user.userId){
        toast({
          title: "Only admin can remove from the group",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top"
      })
      return;
      }

      try{
        setLoading(true);
        const response = await fetch(`https://veilvox.onrender.com/chat/group/remove`, {
          method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    UserId: user1._id
              })
        })
        const res = await response.json();
        const data = res.data;
        user.userId === user1._id ? setSelectedChat() : setSelectedChat(data); // if the removed user was himself, remove the chat

        setFetchAgain(!fetchAgain); // fetch the chats again
        fetchMessages();
        setLoading(false);

      } catch(err){
        toast({
          title: "error: "+err,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
      })
      setLoading(false);
      }
      setGroupChatName("");
    }


    const handleRename = async () => {
        if(!groupChatName) return;

        try{
            setRenameLoading(true);
            const response = await fetch(`https://veilvox.onrender.com/chat/group/rename`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    chatId: selectedChat._id,
                    chatNewName: groupChatName
                })
            })
            const res = await response.json();
            const data = await res.data;
            setSelectedChat(data);
            setRenameLoading(false);
            setFetchAgain(!fetchAgain);
        } catch(err){
            toast({
                title: "error: "+err,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            setRenameLoading(false);
        }
        setGroupChatName("");
    }

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


    return (
        <>
          <IconButton display={{base: "flex"}} icon={<ViewIcon />} cursor="pointer" onClick={onOpen}>Open Modal</IconButton>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
              fontSize="24px"
              display="flex"
              justifyContent="center"
              >{selectedChat.chatName}</ModalHeader>
              <ModalCloseButton cursor="pointer" />
              <ModalBody>
                <Box w="100%" display="flex" flexWrap="wrap" pb={3} >
                    {selectedChat.users.map((u) => (
                        <UserBadge key={u._id} user={u} handleDelete={() => handleDelete(u)} />
                    ))}
                </Box>
                <FormControl display="flex">
                    <Input placeholder="Chat name" 
                    mb={3}
                    value={groupChatName}
                    onChange={(e) => setGroupChatName(e.target.value)}
                    />
                    <Button variant="solid" ml={1} isLoading={renameLoading} cursor="pointer" onClick={handleRename}>Update</Button>

                </FormControl>
                <FormControl>
                    <Input placeholder="Add users" mb={1} onChange={(e) => handleSearch(e.target.value)} />
                </FormControl>
                {(loading) ? (<Spinner size='md' />) : 
                (searchResult.map((u) => (
                  <UserCard key={u._id} user={u} handleFunction={() => handleAdd(u)} />
                )))
                }

              </ModalBody>
    
              {/* <ModalFooter> */}
                <Button colorScheme='blue' onClick={() => handleDelete(user)} width="40%" margin={7} cursor="pointer" backgroundColor="#A52A2A">
                  Leave group
                </Button>
              {/* </ModalFooter> */}
            </ModalContent>
          </Modal>
        </>
      )
}

