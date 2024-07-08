const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const userModel = require('../Model/UserModel')
const postModel = require('../Model/PostModel')
dotenv.config({ path: '../.env' });
const jwtKey = process.env.JWT_KEY;

async function loginUser(req, res) {
    const { username, password } = req.body;
   
    const user = await userModel.findOne({ name: username }).exec();
   
 
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const id = user['_id']
                const token = jwt.sign({ payload: id }, jwtKey);
                res.cookie('user', token, { httpOnly: true});

              
                res.json({
                    status: 201,
                    meassage: "Login successfully",
                    data: user,
                    token: token
                })
            }
            else {
                res.json({ meassage: "Invalid Password" });
            }
        }
        else {
            res.json({ meassage: "Invalid username" });
        }
    }


async function postuser(req, res) {
    if(!req.body.name || !req.body.password){
        return res.status(400).json({
            status: 400,
            message: "Please enter all the fields"
        });
    }
    try {
        const body = req.body;
        const user = await userModel.create(body);

        const id = user['_id']
        const token = jwt.sign({ payload: id }, jwtKey);
        res.cookie('user', token, { httpOnly: true });

        res.json({
            status: 201,
            message: "Registered Successfully",
            data: user,
            token:token
        });
    } catch (error) {
        res.json({
            message: "error: "+error,
            data: []
        })
    }

}

async function searchUser(req, res){
    try{
        const userId = req.params.id;
        // search query
        const { search } = req.body;

         // keyword for search using regex
        const keyword = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } }, // case-insensitive
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};

        const users = await userModel.find(keyword).find({ _id: { $ne: userId } });
        res.json({users: users});

    } catch(error){
        res.json({
            message: "error: "+error,
            data: []
        })
    }

}

async function changePic(req, res){
    try{
        const userName = req.params.id;
        const { newPic } = req.body;
        if(!newPic){
            return res.status(404).json({
                message: "Image can't be empty"
            })
        }

        const user = await userModel.findOneAndUpdate({ name: userName }, {
            $set: { pic: newPic }
        },{
            new: true
        });

        await postModel.updateMany({ name: userName }, {
            $set: { userPic: newPic }  
        })

        res.json({
            status: 201,
            user: user
        })

    } catch(error){
        res.status(500).json({
            message: "error: "+error,
            data: []
        })
    }

}


module.exports = { loginUser ,postuser, searchUser, changePic};