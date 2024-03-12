const mongoose = require('mongoose');
const postModel = require('../Model/PostModel.js');
const {commentModel} = require('../Model/CommentModel.js');

async function createComments(req, res){
    try{
        const body = req.body;
        const comment = await commentModel.create({
            name:body.name,
            userId:body.userId,
            content:body.content
        });
        const commentId = comment._id;
        const postid = req.params.id;

        await postModel.updateOne({
            _id: postid
        },
        {
            $push:{
                comment: commentId 
            }
        }
        );

        res.status(201).json({
            msg : "Comment created sucessfully",
            data : comment
        })

    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}

async function getComments(req, res){
    try{
        const postid = req.params.id;
        const post = await postModel.findOne({ _id: postid }).populate({path:'comment', model: 'commentModel'});

        res.status(201).json(post.comment);


    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}


module.exports={ createComments, getComments };