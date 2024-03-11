const postModel = require('../Model/PostModel');
const userModel = require('../Model/UserModel');

async function createPost(req, res){
    try{
        const body = req.body;
        const userid = req.params.id;
        const post = await postModel.create(body);
        const postId = mongoose.Types.ObjectId(post.id);

        await userModel.updateOne({
            _id : userid
        },
        {
            $push:{
                post: postId
            }
        }
        )

        res.status(201).json({
            msg : "Post created sucessfully",
            data : post
        })
    }
    catch(error){
        console.log(error);
        res.json({
            msg : error
        })
    }
}

async function getAllPosts(req, res){
    try {
        const posts = await userModel.find({}).populate({path:'post', model: 'postModel'});
        
    } catch (error) {
        
    }

    res.status(201).json(posts);
}



module.exports = { getAllPosts, createPost };