const express = require('express');
const connectDB = require('./config/database');
const userModel = require('./models/user');
const { signupValidations } = require('./utils/validations');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const {userAuth} = require('./middlewares/auth')
const app = express();;

app.use(cookieParser())
app.use(express.json());

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, gender, skills, age } = req.body;
    try {
        signupValidations(req);
        const passwordHash = await bcrypt.hash(password, 10);
        const userObj = new userModel({
            firstName,
            lastName,
            email,
            gender,
            skills,
            age,
            password: passwordHash
        })
        await userObj.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        res.status(500).send("Something went wrong" + err.message);
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('Invalid Credentials')
        }
        const isPasswordValid = await user.validatePassword(password)      
        if (isPasswordValid) {
            const token = await user.getJwt()            
            res.cookie("token", token, {expires: new Date(Date.now() + 360000000)})
            res.status(200).send("Login Sucessful")
        }
        else{
            throw new Error("Invalid credentials")
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

app.get('/profile', userAuth, async (req, res)=>{
    try{
        const {user} = req       
        res.send(user)
    }catch{
        res.status(401).send("Unauthorized")
    }
})

app.get('/getConnectionRequest', userAuth, (req, res)=>{
    res.send("Making connection request")
})



connectDB().then(() => {
    console.log("Connection to DB established");
    app.listen(7777, () => {
        console.log('Server listening to port 7777');
    })
})
    .catch(err => console.log(err));