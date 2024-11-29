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

app.delete('/user', async (req, res)=>{
    const id = req.body.id;
    try{
        await userModel.findByIdAndDelete(id);
        res.send("contact deleted sucessfully");
    } catch(e){
        res.status(500).send("Something went wrong")
    }
})

// Patch using id
app.patch('/user', async (req, res)=>{
    const id = req.body.id;
    const data = req.body;
    try{
        const user = await userModel.findByIdAndUpdate(id, data);
        res.send("contact updated sucessfully");
    } catch(e){
        res.status(500).send("Something went wrong")
    }
})

// Patch using email
app.patch('/user', async (req, res)=>{
    const email = req.body.email;
    const data = req.body;
    try{
        const user = await userModel.findOneAndUpdate({email: email}, data);
        res.send("contact updated sucessfully using email");
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