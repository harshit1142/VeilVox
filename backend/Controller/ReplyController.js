const mongoose = require('mongoose');
const { commentModel, replyModel } = require('../Model/CommentModel.js');

async function createReply(req, res){
    try{
        const commentid = req.params.id;
        const body = req.body;
        const reply = await replyModel.create(body);

        const replyId = reply._id;

        await commentModel.updateOne({
            _id: commentid
        },
        {
            $push:{
                replies: replyId 
            }
        }
        );

        res.status(201).json({
            msg : "Reply created sucessfully",
            data : reply
        })


    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}

async function getReplies(req, res){
    try{
        const commentid = req.params.id;
        const comment = await commentModel.findOne({ _id: commentid }).populate({path:'replies', model: 'replyModel'});

        res.status(201).json(comment.replies);


    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}


module.exports = { createReply, getReplies };