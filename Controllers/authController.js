const User = require('./../Models/UserModel');
const jwt = require('jsonwebtoken');

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

 

