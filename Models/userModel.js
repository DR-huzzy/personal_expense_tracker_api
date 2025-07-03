const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
 
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,'please enter your name']
    },

    email: {
        type: String,
        unique: true,
        required: [true,'please enter your email address'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter your email']

    },

    password: {
        type: String,
        required: [true,'please enter your password'],
        minlenght: 8,
        select: false
    },

    confirmPassword: {
        type: String,
        required: [true, 'please confirm password'],
        validate: {
            validator: function(value){
                return value == this.password;
            },
            message: 'Password and confirm password does not match'
        }
    },

    passwordChangedAt : Date
})


userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    //encrypt password
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = undefined;

    next();
});

//a method to compare password
userSchema.methods.comparePasswordsInDb = async function(pswd, pswdDB){
    return await bcrypt.compare(pswd, pswdDB);
}

// a method to check if user has changed the password
userSchema.methods.isPasswordChanged = async function(JWTTimeStamp){

    if(this.passwordChangedAt){

        // convert passwordChangedAt to timeStamp
        const pswdChangedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        console.log(JWTTimeStamp, pswdChangedTimeStamp);

        return JWTTimeStamp < pswdChangedTimeStamp;
    }
    return false;
}



const User = new mongoose.model('User',userSchema);

module.exports = User;