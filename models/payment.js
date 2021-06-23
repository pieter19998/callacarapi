const mongoose = require('mongoose');
const validator = require('validator');
const paymentScheme = new mongoose.Schema({
    date : {
        type : Date,
        required : [true, 'date is required and must be included']
    },
    bankaccount : {
        type : String,
        required : [true, 'bank account is required']
    },
    transactionamount : {
        type : Number,
        required : [true, 'charged amount must be included']
    }
});


module.exports = mongoose.model('Payment', paymentScheme);

