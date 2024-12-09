const requestRouter = require('express').Router();

requestRouter.get('/request', (req, res) => {
    res.send('request')
})
module.exports = requestRouter