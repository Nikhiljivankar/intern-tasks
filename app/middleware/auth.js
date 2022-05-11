
const db = require("../model");
const config=require("../config/auth.config");
const jwt = require('jsonwebtoken');
const { decode } = require('jsonwebtoken');
const User = db.users;


const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        jwt.verify(token,config.secret,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    message:"Unauthorized!!"
                })
            }

        })
        const user = await User.findOne({ email: decoded.email })

        if (!user) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth