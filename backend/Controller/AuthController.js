const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv');
const userModel = require('../Model/UserModel')
dotenv.config({ path: '../.env' });
const jwtKey = process.env.JWT_KEY;

async function loginUser(req, res) {
    const { userId, password } = req.body;
    
    const user = await userModel.findOne({ userId: userId }).exec();
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const id = user['_id']
                const token = jwt.sign({ payload: id }, jwtKey);
                const expirationTime = new Date(new Date().getTime() + 600000);
                res.cookie('user', token, { httpOnly: true, expirationTime: expirationTime });

              
                res.json({
                    status: 200,
                    meassage: "Login successfully",
                    data: user
                })
            }
            else {
                res.json({ meassage: "Invalid Password" });
            }
        }
        else {
            res.json({ meassage: "Invalid userId" });
        }
    }


async function postuser(req, res) {
    try {
        const body = req.body;
        const user = await userModel.create(body);
        res.json({
            status: 201,
            message: "Registered Successfully",
            data: user,
        });
    } catch (error) {
        res.json({
            message: error,
            data: []
        })
    }

}



module.exports = { loginUser ,postuser};