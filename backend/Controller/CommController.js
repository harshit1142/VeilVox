const postModel = require('../Model/PostModel');
const commentModel = require('../Model/CommentModel');
const mongoose = require('mongoose');

async function createComments(req, res){
    try{
        const body = req.body;
        const comment = await commentModel.create(body);
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

    } catch(error){

        res.json({
            msg : error
        })
    }

}


