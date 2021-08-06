const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req,res,next) =>{
    console.log("Inside Authentication middleware")
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decode = jwt.verify(token,'thisisstilinski')
        user = await User.findOne({ _id:decode._id, 'tokens.token':token })
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch(e){
        res.status(401).send({'error':'Please Authenticate'})
    }

}
module.exports = auth