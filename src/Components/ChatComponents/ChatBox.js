import React from "react";
import { useChat } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { SingleChat } from "./SingleChat";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = useChat();
    


    return( 

        <Box
        display={{base: selectedChat ? "flex": "none", md: "flex"}}
        alignItems='center'
        flexDir="column"
        p={3}
        bg="white"
        w={{base:"100%", md:"68%"}}
        borderRadius={10}
        borderWidth="1px"
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
    )
}

