const ErrorHandler = require('../utillib/errorhandler');
const errorCatcherAsync = require('../utillib/asyncerrorcatcher');
const History = require('../models/history');
const Order = require('../models/order');
const ChargingFacility = require('../models/chargingfacility');
const ParkingFacility = require('../models/parkingfacility');
const Car = require('../models/car');
const Payment = require('../models/payment');
const User = require('../models/user');

//================================
//          USER MOCK
//================================
// var user = new User({
//
// })

//================================
//          HISTORY MOCK
//================================
var history1 = new History({
    from:"1234 Brabant Drive",
    to:"4321 Dordrecht",
    depaturetime:Date.now(),
    arrivaltime:Date.now() + 10,
    price:"100",
    car:"6058b02b36f37946d82734b3"
});
var history2 = new History({
    from : "origin",
    to : "destination",
    depaturetime : Date.now(),
    arrivaltime : Date.now() + 50,
    price : "100",
    car : '6058b02b36f37946d82734b3'
});



//get specific history
exports.getHistory = (req,res,next) => {
    //   const role = req.body.role;
    if (role != null) {
        if (role === 'user') {
            res.status(401).json({
                success: false,
                message: 'unauthorized to view data',
                data: 'Unauthorized'
            });
        }
    }
        //  if (role === 'auth') {
        res.status(200).json({
            success: true,
            message: 'mock api retrieval of history successful',
            data: ''
        })
        //  }
};

//};
let historymock = require('../utillib/historymock.json');

//get all history
exports.getHistories = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api retrieval of histories successful',
      //  data : "[" + history1 + "," + history2 + "]"
        data: historymock
    })
};
//================================
//          ORDER MOCK
//================================
var order1 = new Order({
    date : Date.now(),
    price : 100,
    user : '6064c2455d92ef0da8ec9694',
    car : '6058b02b36f37946d82734b3',
    destination : '4 Privet Drive, Surrey'
});
exports.getOrder = (req, res, next) => {
  res.status(200).json({
      success : true,
      message : 'mock api retrieval of order successful',
      data : order1
  })
};

let ordermock = require('../utillib/ordermock.json');
exports.getOrders = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api retrieval of orders successful',
        data : ordermock
    })
};
//================================
//          PAYMENT MOCK
//================================
exports.submitPayment = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'Transaction completed'
    })
};
//================================
//     CHARGING FACILITY MOCK
//================================
var chargingfacility = new ChargingFacility({
    _id : '1058b02b36f37946d82734b5',
    address : '1748LM ABCDEFG',
    chargercount : 10,
    maxchargercount : 10
});
var car1 = new Car({
   _id : '6058b02b36f37946d82734b4',
    brand : 'Idua',
    type : 'Sports',
    owner : 'USER ID GOES HERE',
    parkingfacility : 'PARKING FACILITY ID GOES HERE',
    chargingfacility : '1058b02b36f37946d82734b5',
    available : 'true',
    batterycount : 10,
    batterycountmin : 3,
    batterycountmax : 50
});

exports.chargeCar = (req, res, next) => {
    //happens for specific charging facility with predetermined car
    //todo: update charging facility - availability count --> referenced via id specified in car object
    var charge = car1.charge();
    //chargingfacility.updatechargercount(1);
    if (charge) {
        res.status(200).json({
            success: true,
            message: 'car charged by 1 liter',
            data: car1
        })
    } else {
        res.status(501).json({
            success : false,
            message : 'car cannot be charged any further',
            data: car1
        })
    }
};

let chargingfacilitymock = require('../utillib/chargingfacilitymock.json');

//todo: add route call to update charging facility availability
//get all charging facilities
exports.getChargingFacility = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api retrieval of charging facility successful',
        data: chargingfacility
    })
};
exports.getChargingFacilities = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api of charging facilities successful',
        data : chargingfacilitymock
    })
};


//================================
//     PARKING FACILITY MOCK
//================================
let parkingfacilitymock = require('../utillib/parkingfacilitymock.json');
var parkingFacility = new ParkingFacility({
    _id : '1058b02b36f37946d82734b5',
    address : '1748LM ABCDEFG',
    storagecount : 10,
    maxstoragecount : 20
});
exports.getParkingFacility = (req, res, next) =>  {
    res.status(200).json({
        success : true,
        message : 'mock api of parking facilities successful',
        data : parkingFacility
    })
};
exports.getParkingFacilities = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api of parking facilities successful',
        data : parkingfacilitymock
    })
};
//================================
//     PAYMENT MOCK
//================================
//payment dummy dat
var payment1 = new Payment({
    date : Date.now(),
    bankaccount : 'unique string coming from bank api, name or other identifier',
    transactionamount : 15
});
var payment2 = new Payment({
    date : Date.now(),
    bankaccount : 'uniqueid',
    transactionamount : 12
});
exports.getPayment = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api of retrieve order successful',
        data : payment1
    })
};
exports.getPayments = (req, res, next) => {
    res.status(200).json({
        success : true,
        message : 'mock api of parking facilities successful',
        data : payment1 + " " + payment2
    })
};
