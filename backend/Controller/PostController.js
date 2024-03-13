const postModel = require('../Model/PostModel');
const userModel = require('../Model/UserModel');
const mongoose = require('mongoose');

async function createPost(req, res){
    try{
        const body = req.body;
        const userid = req.params.id;
        const post = await postModel.create(body);
        // const postId = new mongoose.Types.ObjectId(post.id);
        const postId = post._id;
        

        await userModel.updateOne({
            _id: userid
        },
        {
            $push:{
                post: postId
            }
        }
        );


        res.status(201).json({
            msg : "Post created sucessfully",
            data : post
        })
    }
    catch(error){

        res.json({
            msg : "error"+error
        })
    }
}

async function getAllPosts(req, res){
    try {
        const posts = await postModel.find({});
        res.status(201).json(posts);
    } catch (error) {
        
        res.json({
            msg : "error"+error
        })
    }
}

async function getUserPost(req, res){
    try{
        const userid = req.params.id;
        const posts = await userModel.findOne({ _id: userid }).populate({path:'post', model: 'postModel'});

        res.status(201).json(posts.post);

    } catch(error){
        
        res.json({
            msg : "error"+error
        })
    }

}

async function postUpvote(req, res){
    try{
        const body = req.body;
        const userid = body.userId;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        const ifUpvoteExists = post.upvote.indexOf(userid);
        const ifDownvoteExists = post.downvote.indexOf(userid);

        if(ifUpvoteExists != -1){
            // remove upvote
            post.upvote.splice(ifUpvoteExists, 1);
        }
        else{
            if(ifDownvoteExists != -1){
                // remove downvote
                post.downvote.splice(ifDownvoteExists, 1);
            }
            // add upvote
            post.upvote.push(userid);
        }
        const result=await postModel.findByIdAndUpdate({_id:postid},
            { 
                upvote:post.upvote,
                downvote:post.downvote
            },
            {
                new: true
            }
            );
            

        res.status(201).json({
            msg: "Upvoted successfully",
            data: result
        })


    } catch(error){

        res.json({
            msg : "error"+error
        })
    }
}

async function postDownvote(req, res){
    try{
        const body = req.body;
        const userid = body.userId;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        const ifDownvoteExists = post.downvote.indexOf(userid);
        const ifUpvoteExists = post.upvote.indexOf(userid);

        if(ifDownvoteExists != -1){
            // remove downvote
            post.downvote.splice(ifDownvoteExists, 1);
        }
        else{
            if(ifUpvoteExists != -1){
                // remove upvote
                post.upvote.splice(ifUpvoteExists, 1);
            }
            // add downvote
            post.downvote.push(userid);
        }
        const result=await postModel.findByIdAndUpdate({_id:postid},
            { 
                upvote:post.upvote,
                downvote:post.downvote
            },
            {
                new: true
            }
            );
        

        res.status(201).json({
            msg: "Downvoted successfully",
            data: result
        })


    } catch(error){

        res.json({
            msg : "error"+error
        })
    }
}

async function getUpDownVote(req, res){
    try{

        const postid = req.params.id;
        const post = await postModel.findOne({ _id: postid })
        .populate({path:'upvote', model: 'userModel'})
        .populate({path:"downvote", model: "userModel"});

        res.status(201).json({
            postid: postid,
            upvote: post.upvote.length,
            downvote: post.downvote.length
        });

    } catch(error){

        res.json({
            msg : "error"+error
        })
    }

}



module.exports = { getAllPosts, createPost, getUserPost, postUpvote, postDownvote, getUpDownVote };