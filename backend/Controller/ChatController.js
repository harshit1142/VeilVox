const chatModel = require('../Model/ChatModel');
const userModel = require('../Model/UserModel');


 async function postChat(req,res){
    try {
        const body =req.body;
        const otherUserId = body.otherUserId;
        const userId = req.params.id;
        if (otherUserId === userId){
            res.json({
                status: 201,
                meassage: "Invalid Chat",
                data: []
            })
        }
        var isChat=await chatModel.find({
            isGroupChat:false,
            $and:[
                {users:{$elemMatch:{$eq:userId}}},
                {users:{$elemMatch:{$eq:otherUserId}}}
            ]
        }).populate("users","-password -post").populate("latestMessage");

        isChat=await userModel.populate(isChat,{
            path:"latestMessage.sender",
            select:"name _id pic"
        })
        if(isChat.length >0){
        
            res.json({
                status: 201,
                meassage: "Chat Found",
                data: isChat[0]
            })
        }else{
            var chatData={
                chatName:"sender",
                isGroupChat:false,
                users:[userId,otherUserId]
            }

            const createChat=await chatModel.create(chatData);

            const fullChat = await chatModel.findOne({ _id: createChat._id }).populate("users", "-password");

            
            res.json({
                status: 201,
                meassage: "Chat Created",
                data: fullChat
            })

        }
    } catch (error) {
        res.json({
            message: error,
            data: []
        })
    }
}

 async function getAllChat(req, res) {
    try {
        const userId=req.params.id;
       const chat= chatModel.find({users:{$elemMatch:{$eq:userId}}})
       .populate("users","-password")
       .populate("groupAdmin","-password")
       .populate("latestMessage")
       .sort({updatedAt:-1})
       .then(async (result)=>{
           result = await userModel.populate(result,{
             path:"latestMessage.sender",
             select:"name _id pic"
        })

        res.json({
            status: 201,
            meassage: "All Chats",
            data: result
        })

       })


    } catch (error) {
        res.json({
            message: "error" + error,
            data: []
        })
    }
}

async function createGroupChat(req, res) {
   let users = JSON.parse(req.body.users);
   // add curr user too from frontend
    const admin = req.params.id;
   users.push(admin);
   if(users.length <2){
       res.json({
           status:400,
           message: "More than 2 users required",
           data: []
       })
   }

   try {
    const groupChat=await chatModel.create({
        chatName:req.body.chatName,
        users:users,
        isGroupChat:true,
        groupAdmin:admin
    })
    const fullGroupChat=await chatModel.findOne({_id:groupChat._id})
    .populate("users","-password -post")
    .populate("groupAdmin","-password")
       res.json({
           status: 201,
           message: "GroupChat Created",
           data: fullGroupChat
       })

   } catch (error) {
        console.log("error"+error);
       res.json({
           message: "error" + error,
           data: []
       })
   }
}

async function renameChat(req,res){
    const {chatId,chatNewName}=req.body;
  try {
      const updateChat = await chatModel.findByIdAndUpdate(
          chatId,
          {
              chatName: chatNewName
          }, {
          new: true
      }
      ).populate("users", "-password -post")
          .populate("groupAdmin", "-password -post")


      if (updateChat) {
          res.json({
              status: 201,
              meassage: "GroupChat Renamed",
              data: updateChat
          })
      } else {
          res.json({
              status: 404,
              message: "Chat Not Found",
              data: []
          })
      }
  } catch (error) {
      res.json({
          message: "error: " + error,
          data: []
      })
  }
    
}

async function addToGroup(req,res){
    const {chatId,newUserId}=req.body;
  try {
      const addedUser = await chatModel.findOneAndUpdate(
          {_id: chatId},
          {
            $push:{users:newUserId}
          },
           {
          new: true
           }
      ).populate("users", "-password -post")
          .populate("groupAdmin", "-password -post")


      if (addedUser) {
          res.json({
              status: 201,
              meassage: "User Added",
              data: addedUser
          })
      } else {
          res.json({
              status: 404,
              message: "Chat Not Found",
              data: []
          })
      }
  } catch (error) {
      res.json({
          message: "error: " + error,
          data: []
      })
  }
    
}
async function removeFromGroup(req,res){
    const {chatId,UserId}=req.body;
  try {
      const removeUser = await chatModel.findOneAndUpdate(
        {_id: chatId},
          {
            $pull:{users:UserId}
          },
           {
          new: true
           }
      ).populate("users", "-password -post")
          .populate("groupAdmin", "-password -post")


      if (removeUser) {
          res.json({
              status: 201,
              meassage: "User Removed",
              data: removeUser
          })
      } else {
          res.json({
              status: 404,
              message: "Chat Not Found",
              data: []
          })
      }
  } catch (error) {
      res.json({
          message: "error" + error,
          data: []
      })
  }
    
}

module.exports = { getAllChat, postChat, createGroupChat, renameChat, addToGroup, removeFromGroup };