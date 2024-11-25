const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
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


connectDB().then(()=>{
    console.log("Connection to DB established");
    app.listen(7777, ()=>{
        console.log('Server listening to port 7777');
    })
})
.catch(err => console.log(err));