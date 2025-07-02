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

// compare password
userSchema.methods.comparePasswordsInDb = async function(pswd, pswdDB){
    return await bcrypt.compare(pswd, pswdDB);
}





const User = new mongoose.model('User',userSchema);

module.exports = User;