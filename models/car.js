const mongoose = require('mongoose');
const validator = require('validator');
const carScheme = new mongoose.Schema({
    brand : {
        type : String,
        required: [true, 'Please enter a car brand']
    },
    type : {
        type : String,
        required: [true, 'Please enter a type']
    },
    owner : String,
    parkingfacility : String,
    chargingfacility : String,
    history : {
        type : [Object],
    },
    available : Boolean,
    seatsmax : Number,
    seatscurrent : Number,
    batterycount : Number,
    batterycountmin : Number,
    batterycountmax : Number
});

carScheme.methods.checkAvailability = function() {
    if (this.seatscurrent >= seatsmax) {
        this.seatscurrent = this.seatsmax;
        this.available = false;
    }
    if (this.batterycount <= batterycountmin) {
        this.available = false;
    }

    if (this.seatscurrent < this.seatsmax && this.batterycount > this.batterycount ) {
        this.available = true;
    }
};

carScheme.methods.incSeat = function() {
    this.seatscurrent += 1;
    this.checkAvailability();
};
carScheme.methods.decSeat = function() {
    this.seatscurrent -= 1;
    this.checkAvailability();
};


//charge per liter
carScheme.methods.charge = function() {
    if (this.batterycount < this.batterycountmax) {
        this.batterycount += 1;
    }
    if (this.batterycount === this.batterycountmax) {
        console.log('car fully charged');
        return false;
    }
    if (this.batterycount >= this.batterycountmin) {
        console.log('car has enough fuel');
    }
    return true;
};




module.exports = mongoose.model('Car', carScheme);
