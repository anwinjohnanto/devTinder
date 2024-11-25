const mongoose = require('mongoose');

const connectDb = async ()=>{
    mongoose.connect('mongodb+srv://aanto6151:DhVwMWIKwxdouapS@demo1.uzpgv.mongodb.net/devTinder')
}

module.exports = connectDb