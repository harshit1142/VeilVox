import { createContext, useContext, useState  } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children}) => {
    const [selectedChat, setSelectedChat] = useState();
    const [notification, setNotification] = useState([]);
    const [chats, setChats] = useState();

    return(
    <ChatContext.Provider value ={{ selectedChat, setSelectedChat, notification, setNotification, chats, setChats }}>
        {children}
    </ChatContext.Provider>)
};

export const useChat = () => {
    return useContext(ChatContext);
}

