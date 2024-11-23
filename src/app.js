const express = require('express');

const app = express();;

app.use("/hello", (req, res)=>{
    res.send("Hello World!")
})

app.listen(7777,()=>{
    console.log("server is listening to port 7777");
})