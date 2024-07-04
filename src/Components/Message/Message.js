import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin } from "../ChatLogic";
import { Avatar } from "@chakra-ui/react";

export const Message = ({messages}) => {
    const selectUser = (state) => state.UserReducer.user;
    const user = useSelector(selectUser);

    return(
        <ScrollableFeed>
            {messages && messages.map((m, i) => (
                <div style={{display:"flex"}} key={m._id}>
                    {
                        (isSameSender(messages, m, i, user.userId) || isLastMessage(messages, i, user.userId))
                        && (
                            <Avatar 
                            mt="7px"
                            mr={1}
                            size="sm"
                            name={m.sender.name}
                            src={m.sender.pic}
                            />
                        )
                    }
                    <span style={{backgroundColor: `${
                  m.sender._id === user.userId ? "#BEE3F8" : "#B9F5D0"
                }`, 
                borderRadius:"20px",
                padding: "5px 15px",
                maxWidth:"75%",
                marginLeft: isSameSenderMargin(messages, m, i, user.userId),
                marginTop: isSameSender(messages, m, i, user.userId) ? 3 : 10
                }}>
                    {m.content}
                    </span>
                </div>
            ))}
        </ScrollableFeed>
    )
}
