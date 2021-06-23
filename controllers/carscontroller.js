const Car = require('../models/car');
const ErrorHandler = require('../utillib/errorhandler');
const errorCatcherAsync = require('../utillib/asyncerrorcatcher');
//get a specific car by id => /api/v1/car/:id
exports.getCar = async(req,res,next) => {
    const car = await Car.findById(req.params.id);


    if (!car) {
        return res.status(404).json({
            success : false,
            message : 'car could not be found'
        })
    }
    res.status(200).json({
        success : true,
        message : 'car retrieved',
        data: car
    })
};


//get all active cars => /api/v1/callers
exports.getCars = async (req, res, next) => {
    const cars = await Car.find();

    res.status(200).json({
        success: true,
        results: cars.length,
        data : cars
    })
};

//update a car => /api/v1/car/:id
exports.updateCar = async (req, res, next) => {
    var car = null;
    try {
    car = await Car.findById(req.params.id);
    } catch (err) {
        res.status(500).json({
            success : false,
            message : err
        })
    }
    //todo: error handling
    if (!car) {
        res.status(404).json({
            success: false,
            message: 'car could not be found.'
        });
        return next(new ErrorHandler('car could not be found', 404));
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators : true,
        useFindAndModify : false
    });

    res.status(200).json({
        success : true,
        message : 'car registry successfully updated.',
        data : car
    })
};

//delete a car => /api/v1/car/:id
exports.deleteCar = async (req, res, next) => {
    var car = null;
    try {
        car = await Car.findById(req.params.id);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }

    if (!car) {
        return res.status(404).json({
            success: false,
            message: 'car could not be found.'
        })
    }

    car = await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success : true,
        message : 'car removed from registry.'
    })
};

//todo: bugfix async error middleware
//create a new car => /api/v1/car/register
exports.registerCar = async (req,res,next) => {
        var car = null;
    try {
        car = await Car.create(req.body);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
    res.status(200).json({
        success: true,
        message: 'car registered',
        data: car
    });
    next();
};
