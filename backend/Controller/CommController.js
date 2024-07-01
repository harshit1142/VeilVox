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

        await postModel.findByIdAndUpdate({
            _id: postid
        },
        {
            $push:{
                comment: commentId 
            }
        }
        );

        res.json({
            status:201,
            msg : "Comment created sucessfully",
            data : comment
        })

    } catch(error){
        res.json({
            msg : "error: "+error
        })
    }

}

async function getComments(req, res){
    try{
        const postId = req.params.id;
        const post = await postModel.findOne({ _id: postId})
        .populate({
            path: 'comment',
            model: 'commentModel',
            populate: {
              path: 'replies',
              model: 'commentModel',
            }
        });
        
        var comment = post.comment;
        comment.filter((c) => {
            return (!c.isReply)
        })
       
        
        res.status(201).json(comment);

    } catch(error){
        res.json({
            msg : "error: "+error
        })
    }

}

async function postReply(req, res){
    try{
        const { name, userId, content, parentCommentId } = req.body;
        const reply = await commentModel.create({
            name: name,
            userId: userId,
            content: content,
            isReply: true,
            parentComment: parentCommentId
        });

        await commentModel.findByIdAndUpdate({
            _id: parentCommentId
        },
        {
            $push:{
                replies: reply._id 
            }
        }
        );
        
        res.status(201).json(reply);

    } catch(err){
        res.json({
            msg : "error: "+err
        })
    }
}


module.exports={ createComments, getComments, postReply };