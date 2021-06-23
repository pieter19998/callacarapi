const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userScheme = new mongoose.Schema({
    firstname: {
        type : String,
        required: [true, 'Please enter your first name']
    },
    lastname: {
        type : String,
        required : [true, 'Please enter your last name']
    },
    email: {
        type : String,
        required : [true, 'Please enter your email address'],
        unique : true,
        validate : [validator.isEmail, 'Please enter a valid email address']

    },
    role : {
        type : String,
        enum: {
            values : ['user', 'carowner'], //non allowed roles --> parking facility, charging facility, admin, owner,
            message : 'Please enter correct role'
        },
        default : 'user'
    },
    password : {

        type : String,
        required: [true, 'Please enter password for your account'],
        minlength: [8, 'Your password must be at least 8 characters long'],
        select: false
    },
    createdat : {
        type : Date,
        default : Date.now
    },
    resetpasswordtoken : String,
    resetpasswordexpire : Date,
    birthdate : Date,
    address : {
        type : String,
        required : true
    }
});




//encrypt passwords before save
userScheme.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
});

//return JSON web token
userScheme.methods.getJwtToken = function() {
    return jwt.sign({ id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRES_TIME
    })
};


//compare user password to database password through hash
userScheme.methods.comparePassword = async function(enterPassword) {
    const result = await bcrypt.compare(enterPassword, this.password);
    console.log(result);
    return result;
};


module.exports = mongoose.model('User', userScheme);
