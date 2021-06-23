const mongoose = require('mongoose');
const validator = require('validator');
const orderScheme = new mongoose.Schema({
   date : {
       type : Date,
       required : [true, 'date is required and must be included']
   },
   user : {
       type : [Object],
       ref : 'User',
       required : [true, 'user reference is required']
   },
    price : {
       type : String,
        required : [true, 'transaction price/amount is required and must be included']
    },
    destination : {
       type : String,
        required : [true, 'destination is required and must be included']
    },
    car : {
        type : [Object],

        ref : 'Car',
        required : [true, 'reference to car cannot be empty']
    }
});


module.exports = mongoose.model('Order', orderScheme);

