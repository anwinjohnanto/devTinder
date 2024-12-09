const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            throw new Error(" Token Expired")
        }
        const decodedData = await jwt.verify(token, "shalom")
        const user = await userModel.findById({_id: decodedData._id})        
        if (!user) {
            throw new Error(" Invalid user token")
        }
        req.user = user
        next()
    }catch(e){
        res.status(400).send("ERROR:" + e.message)
    }
}

module.exports = { userAuth };