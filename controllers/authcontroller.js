const User = require('../models/user');


//Register a new user => /api/v1/user/register
exports.registerUser = async (req, res, next) => {
    const {firstname,lastname,email,role,password,createdat,resetpasswordtoken,resetpasswordexpire,birthdate,address} = req.body;

    const user = await User.create({
        firstname,
        lastname,
        email,
        role,
        password,
        createdat,
        resetpasswordtoken,
        resetpasswordexpire,
        birthdate,
        address
    });
    //create jwt token
    const token = user.getJwtToken();

    res.status(200).json({
        success : true,
        message : 'user registered successfully',
        token
    });
};


exports.loginUser = async (req, res, next) => {
  const {email, password} = req.body;

  //check that email and password are entered
    if (!email || !password) {
        res.status(400).json({
            success: false,
            message: 'Please enter email address and password'
        })
    }

    //find user in database
    //var user = null;
       const user = await User.findOne({email}).select('+password');
        console.log('found user: ' + user);

    if (!user) {
        res.status(401).json({
            success: false,
            message: 'Invalid email address or password'
        });
    }
    console.log(user);
    //check if password is correct
       const ispasswordmatched = await user.comparePassword(password);
        console.log(ispasswordmatched);
        if (!ispasswordmatched) {
            res.status(401).json({
                success: false,
                message: 'Invalid email address or password'
            });
        }
        if (ispasswordmatched) {
            res.status(200).json({
                success : true,
                message : 'success',
                data : user
            })
        }


    //create jwt token
        const token = await user.getJwtToken();
        res.status(200).json({
            success: false,
            token
        });

};
