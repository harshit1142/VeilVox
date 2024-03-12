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



module.exports = { getAllPosts, createPost, getUserPost };