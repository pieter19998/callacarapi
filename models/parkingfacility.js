const mongoose = require('mongoose');
const validator = require('validator');
const parkingfacilityScheme = new mongoose.Schema({
    address : {
        type : String,
        required : true
    },
    storagecount : {
        type : Number,
        required : true
    },
    maxstoragecount : {
        type : Number,
        required : true
    },
});

parkingfacilityScheme.methods.canPark = function() {
    if (this.storagecount >= this.maxstoragecount) {
        return false;
    }
    if (this.storagecount < this.maxstoragecount) {
        this.storagecount++;
        return true;
    }
};



module.exports = mongoose.model('Parkingfacility', parkingfacilityScheme);
