const postModel = require('../Model/PostModel');
const userModel = require('../Model/UserModel');
const mongoose = require('mongoose');
const limit = 5;

async function createPost(req, res){
    try{
        const body = req.body;
        // console.log(body);
        const userid = req.params.id;
        const post = await postModel.create(body);
        // const postId = new mongoose.Types.ObjectId(post.id);
        const postId = post._id;
        

        await userModel.findByIdAndUpdate({
            _id: userid
        },
        {
            $push:{
                post: postId
            }
        }
        );


        res.json({
            status:201,
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

async function getPagePost(req, res){
    const page = parseInt(req.params.page);
    const skip = (page-1)*limit; // how many post needs to be skipped   

    try{
        const posts = await postModel.find({}).skip(skip).limit(limit).sort({ timestamp: -1 }).populate({
            path: "comment",
            options: { sort: { timestamp: -1 } }
        });
        res.status(201).json({
            data: posts
        });
    }
    catch(error){
        res.status(500).json({
            msg : "error"+error
        })
    }
}

async function getAllPosts(req, res){
    try {
        const posts = await postModel.find({}).sort({ timestamp: -1 }).populate({
            path: "comment",
            options: { sort: { timestamp: -1 } }
        });
        res.status(201).json(posts);
    } catch (error) {
        res.json({
            msg : "error"+error
        })
    }
}

// returns all the posts of the user and the total sum of upvotes and downvotes of all posts
async function getUserPost(req, res){
    try{
        const userid = req.params.id;

        const posts = await userModel.findOne({ _id: userid }).populate("post");
        
        var up=0,down=0;
        for(var i=0;i<posts.post.length;i++){
          up+=posts.post[i].upvote.length;
          down+=posts.post[i].downvote.length;
        }

        res.status(201).json({
            post:posts.post,
            upvote:up,
            downvote:down
        });

     
     

    } catch(error){
        
        res.json({
            msg : "error"+error
        })
    }

}
async function getAPost(req, res){
    try{
        const postId = req.params.id;

        const post = await postModel.findOne({ _id: postId }).populate("comment");
        
       

        res.json({
            status:201,
            data:post
        });

     
     

    } catch(error){
        
        res.json({
            msg : "error"+error
        })
    }

}

async function postUpvote(req, res){
    try{
        const body = req.body;
        const userid = body.userid;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        let ifUpvoteExists = post.upvote.indexOf(userid);
        let ifDownvoteExists = post.downvote.indexOf(userid);

        if(ifUpvoteExists != -1){
            // remove upvote
            post.upvote.splice(ifUpvoteExists, 1);
            ifUpvoteExists = -1;
        }
        else{
            if(ifDownvoteExists != -1){
                // remove downvote
                post.downvote.splice(ifDownvoteExists, 1);
                ifDownvoteExists = -1;
            }
            // add upvote
            post.upvote.push(userid);
            ifUpvoteExists = post.upvote.length - 1;
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
            

        res.json({
            status:201,
            msg: "Upvoted successfully",
            isUpvoted: ifUpvoteExists,
            isDownvoted: ifDownvoteExists,
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
        const userid = body.userid;
        const postid = req.params.id;
        const post = await postModel.findOne({
            _id: postid
        })

        let ifDownvoteExists = post.downvote.indexOf(userid);
        let ifUpvoteExists = post.upvote.indexOf(userid);

        if(ifDownvoteExists != -1){
            // remove downvote
            post.downvote.splice(ifDownvoteExists, 1);
            ifDownvoteExists = -1;
        }
        else{
            if(ifUpvoteExists != -1){
                // remove upvote
                post.upvote.splice(ifUpvoteExists, 1);
                ifUpvoteExists = -1;
            }
            // add downvote
            post.downvote.push(userid);
            ifDownvoteExists = post.downvote.length - 1;
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
        

        res.json({
            status: 201,
            msg: "Downvoted successfully",
            isUpvoted: ifUpvoteExists,
            isDownvoted: ifDownvoteExists,
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

        res.json({
            status: 201,
            msg: "post details",
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



module.exports = { getPagePost, getAllPosts, createPost, getUserPost, postUpvote, postDownvote, getUpDownVote, getAPost };