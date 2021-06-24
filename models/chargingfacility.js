const mongoose = require('mongoose');
const validator = require('validator');
const chargingfacilityScheme = new mongoose.Schema({
    address : {
        type : String,
        required : true
    },
    chargercount : {
        type : Number,
        required : true
    },
    maxchargercount : {
        type : Number,
        required : true
    }
});


    //init charging facility
    chargingfacilityScheme.methods.initialize = function() {
        this.chargercount = 20;
        this.maxchargercount = this.chargercount;
    };

    chargingfacilityScheme.methods.updatechargercount = function(val) {
        this.chargercount += val;
        return (chargercount > maxchargercount)
}

    chargingfacilityScheme.methods.addChargeCar = function(toadd) {
      this.cararr.push(toadd._id);
    };
    chargingfacilityScheme.methods.removeChargeCar = function(toremove) {
        this.cararr.pull(toremove._id)
    };
    chargingfacilityScheme.updateObsolete = function() {
        for (var i = 0; i < this.cararr.size(); i++) {
        }
    };
    chargingfacilityScheme.updateb = function(car) {
        if (car.batterycount < car.batterycountmax) {
            car.batterycount += 1;
        }
        if (car.batterycount === car.batterycountmax) {
            console.log('car fully charged');
            return false;
        }
        if (car.batterycount >= car.batterycountmin) {
            console.log('car has enough fuel');
        }
        return true;
    };






module.exports = mongoose.model('Chargingfacility', chargingfacilityScheme);
