const express = require('express');

const app = express();;


app.use('/users', (req, res, next)=>{
    console.log("Response 1");
    // res.send("Response 1");
    next();
},
[(req,res)=>{
    console.log("Response 2");
    res.send("Response 2");
},
(req,res)=>{
    console.log("Response 2");
    res.send("Response 2");
}]
)


app.listen(7777,()=>{
    console.log("server is listening to port 7777");
})