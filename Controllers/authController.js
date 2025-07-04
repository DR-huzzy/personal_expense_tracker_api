const User = require('./../Models/UserModel');
const jwt = require('jsonwebtoken');
const util = require('util');

const signToken = id => {
    return jwt.sign(
        {id}, process.env.SECRETE_STR,{ expiresIn : process.env.LOGIN_EXPIRES}
    )
};

exports.signUp = async (req, res, next) => {

    try{
        const newUser = await User.create(req.body);

        const token = signToken(newUser._id);

        res.status(200).json({
            status: 'Success',
            token,
            data: {
                user: newUser
            }
        })   
    }catch(err){
        console.log(err.message);
    }
     

}


exports.login = async (req, res, next) => {

    try {

        const {email, password} = req.body;

        // check if email and password are present in the req.body
        if (!email || !password){
            return res.status(400).json({
                status: 'fail',
                message: 'Email and password are required'
            })
        }

        // check if the user exist with a given email
        const user = await User.findOne({ email }).select('+password');

        // check if the password matches
        const isMatch = await user.comparePasswordsInDb(password, user.password)

        // check if user exist and password matches
        if(!user || !isMatch){
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect email or password'
            })
        }

        const token = signToken(user.id)

        res.status(200).json({
            status: 'success',
            token,
        })
    } catch (err) {
        console.log(err.message);
    }

    
}


exports.protect = async( req, res, next) => {

    try {
        //1. read the token and check if it exist
     
        const testToken = req.headers.authorization;
        let token;

        if(testToken && testToken.startsWith('Bearer')){
            token = testToken.split(' ')[1];
        }
        if(!testToken){
            res.status(400).json({
                status: 'fail',
                message: 'You are not logged in'
            })
        }

        //2.validate the token

        const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRETE_STR);
        //console.log(decodedToken);
        
        //3. if user exist

        const user = await User.findById(decodedToken.id);

        if(!user){
            res.status(400).json({
                status: 'fail',
                message: 'The user with the given token does not exist'
            })
        }


        //4. if the user change password after the token was issued

        const PasswordChanged = await user.isPasswordChanged(decodedToken.iat)

        if(PasswordChanged){
            res.status(400).json({
                status: 'fail',
                message: 'The password has been changed'
            })
        }

        //5. allow user to access route
        //This is for the next middleware

        req.user = user
        //console.log(req.user._id);
        next();

    } catch (err) {
        console.log(err.message);
    }
    
}

 

