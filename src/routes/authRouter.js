const authRouter = require('express').Router();
const bcrypt = require('bcryptjs');
const userModel = require('../models/user');
const {signupValidations} = require('../utils/validations');

authRouter.post('/signup', async (req, res)=>{
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

authRouter.post('/login', async (req, res)=>{
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

module.exports = authRouter