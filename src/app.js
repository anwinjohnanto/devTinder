const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const connectDB = require('./config/database');
const userModel = require('./models/user')
const app = express();;

app.use(express.json());

app.post('/signup', async (req, res)=>{
    const userObj = new userModel(req.body);

    try{
        await userObj.save();
        res.status(201).send('User created successfully');
    }catch(err){
        res.status(500).send("Something went wrong");
    }
})

app.get('/user', async (req, res)=>{
    try{
        const user = await userModel.findOne({email: req.body.email});        
        if (!user) {
            res.status(404).send("User not found");
        }
        else{
            res.status(200).send(user);
        }
    }catch(err){
        res.status(500).send("Something went wrong");
    }
    
})

app.get('/feed', async (req, res)=>{
    try{
        const feed = await userModel.find({}).exec();
        if (feed.length == 0) {
            res.status(404).send("users not found")
        }
        else{
            res.send(feed)
        }
    } catch(e){
        res.status(500).send("Something went wrong")
    }
})

connectDB().then(()=>{
    console.log("Connection to DB established");
    app.listen(7777, ()=>{
        console.log('Server listening to port 7777');
    })
})
.catch(err => console.log(err));