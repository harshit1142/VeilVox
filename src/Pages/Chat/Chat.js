import React from 'react'

export default function Chat() {

  async function getAllChat() {
    const response = await fetch(`http://localhost:4000/chat/${user.userId}`)
    const res = await response.json();
    // setAllPost(res);
  }

  async function createChat(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/chat/${user.userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        // otherUserId: input.otherUserId
      })
    })
    const res = await response.json();
    if (res.status === 201) {
      alert("Group Created Successfully!!");
      // history.push("/main");
    } else {
      alert("Error Occured" + res.message);
    }
  }

  async function createGroupChat(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/chat/${user.userId}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        // users: input.users,
        // chatName:input.chatName
      })
    })
    const res = await response.json();
    if (res.status === 201) {
      
      // history.push("/main");
    } else {
      alert("Error Occured" + res.message);
    }
  }

  async function addToGroup(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/group/remove`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        // chatId: input.users,
        // UserId:input.chatName
      })
    })
    const res = await response.json();
    if (res.status === 201) {
      alert("User Added Successfully!!");
      // history.push("/main");
    } else {
      alert("Error Occured" + res.message);
    }
  }
  
  async function removeFromGroup(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/group/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        // chatId: input.users,
        // newUserId:input.chatName
      })
    })
    const res = await response.json();
    if (res.status === 201) {
      alert("User Removed Successfully!!");
      // history.push("/main");
    } else {
      alert("Error Occured" + res.message);
    }
  }
  async function userChat(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/chat/${user.userId}`)
    const res = await response.json();
    //  
  }

  return (
    <div>Chat</div>
  )
}
