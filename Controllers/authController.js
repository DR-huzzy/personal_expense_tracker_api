const User = require('./../Models/UserModel');

exports.signUp = async (req, res) => {

    try{
        const newUser = await User.create(req.body);

        res.status(200).json({
            status: 'Success',
            data: {
                user: newUser
            }
        })   
    }catch(err){
        console.log(err.message);
    }
     

}

 

