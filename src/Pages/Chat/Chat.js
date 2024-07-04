import { Box, useChakra } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SideDrawer } from '../../Components/ChatComponents/SideDrawer';
import { MyChats } from '../../Components/ChatComponents/MyChats';
import { ChatBox } from '../../Components/ChatComponents/ChatBox';
import '../Feed/Feed.css'
import { useChat } from '../../Context/ChatProvider';

export default function Chat() {
  const selectUser = (state) => state.UserReducer.user;
  const user = useSelector(selectUser);
  const history = useHistory();
  const [fetchAgain, setFetchAgain] = useState(false);

  if ((user === null || user.name === "")) {
    return history.push("/login");
  }

  return (
    <>

      
      <div style={{width:"100%"}}>
        {<SideDrawer />}
        <Box display="flex" justifyContent="space-between" padding="8px" height="90vh">
          {<MyChats fetchAgain={fetchAgain} />}
          {<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}


        </Box>

      </div>
    </>
  )
}
