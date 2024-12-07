const validator = require('validator');
const signupValidations = (req) =>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName){
        throw new Error(' Name field are required');
    }
    if(!email){
        throw new Error(' Email field is required');
    }
    if(!password){
        throw new Error(' Password field is required');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('  Password not strong');
    }
    
}

module.exports = {signupValidations}