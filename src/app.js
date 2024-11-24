const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const app = express();;


app.use('/users', (req, res, next) => {
    try{

        throw new Error('Something went wrong');
    } catch(err){
        res.status(500).send('Something went wrong try');
    }
})
app.use('/', (err, req, res, next) => {
    if (err) {
        res.status(500).send('Something went wrong');       
    }
    
});

app.listen(7777,()=>{
    console.log("server is listening to port 7777");
})