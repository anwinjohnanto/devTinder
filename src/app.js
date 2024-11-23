const express = require('express');
const { adminAuth, userAuth } = require('./middlewares/auth');
const app = express();;


app.use('/admin', adminAuth);

app.get('/admin/getAllUsers', (req, res)=>{
    res.send('get all users');
})
app.post('/admin/createUser', (req, res)=>{
    res.send('post all users');
})

app.get('/user/dashboard', userAuth, (req, res)=>{
    res.send('user dashboard');
})
app.get('/user/login', (req, res)=>{
    res.send('user dashboard');
})


app.listen(7777,()=>{
    console.log("server is listening to port 7777");
})