const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxLength: 50,
        minlength: 2
    },
    lastName: {
        type: String,
        maxLength: 50,
        minlength: 2
    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 20,
        trim: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Password should be strong')
            }
        }
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
        required: true,
        trim: true,
        default: 18,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ['male', 'female'],
        validate(value) {
            if (value !== 'male' && value !== 'female') {
                throw new Error('Gender should be either male or female')
            }
        }
    },
    pthotoUrl: {
        type: String,
        trim: true,
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error('Invalid URL')
            }
        }
    },
    skills: {
        type: [String],
        trim: true,
        default: [],
        validate(value) {
            if (value.length > 5) {
                throw new Error('Skills should be less than 5')
            }
        }
    }
})

module.exports = mongoose.model('User', userSchema);