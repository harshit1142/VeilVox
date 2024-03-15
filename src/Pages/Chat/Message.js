import React from 'react'

export default function Message() {


    async function getChatMsg() {
        const response = await fetch(`http://localhost:4000/message/chatId`)
        const res = await response.json();
        // 
    }

    async function sendMsg(e) {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/message/chatId`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                //  content: input.caption,
                //  userId: input.imageURL
            })
        })
        const res = await response.json();
        if (res.status === 201) {
           
            // history.push("/main");
        } else {
            alert("Error Occured" + res.message);
        }
    }

  return (
    <div>Message</div>
  )
}
