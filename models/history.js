const mongoose = require('mongoose');
const validator = require('validator');
const historyScheme = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    departuretime : Date,
    arrivaltime : Date,
    price : String,
    car : {
        type: [Object],
        ref: 'Car',
        required : [true, 'car reference can not be null'],
    }

});



module.exports = mongoose.model('History', historyScheme);
