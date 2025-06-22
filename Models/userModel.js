const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
 
const UserSchema = new mongoose.Schema({

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
    }

})