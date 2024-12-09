const express = require('express');
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const profileRouter = require('./routes/profileRoutes');
const requestRouter = require('./routes/requestRouter');
const app = express();;

app.use(cookieParser())
app.use(express.json());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);

connectDB().then(() => {
    console.log("Connection to DB established");
    app.listen(7777, () => {
        console.log('Server listening to port 7777');
    })
})
    .catch(err => console.log(err));