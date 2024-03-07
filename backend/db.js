const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config({path:'../.env'})

function DB(){
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then((conn)=>console.log('Database Connected'))
        .catch((error)=>console.log(error))
    } catch (error) {
        console.log(error);
    }
}

module.exports = DB;