const profileRoutes = require('express').Router();
const {userAuth} = require('../middlewares/auth');

profileRoutes.get('/profile', userAuth, async (req, res) => {
    try{
        const {user} = req       
        res.send(user)
    }catch{
        res.status(401).send("Unauthorized")
    }
})

module.exports = profileRoutes