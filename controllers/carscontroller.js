const Car = require('../models/car');
const ErrorHandler = require('../utillib/errorhandler');

exports.getCar = async (req, res, next) => {
    const car = await Car.findById(req.params.id);


    if (!car) {
        return res.status(404).json({
            success: false,
            message: 'car could not be found'
        })
    }
    res.status(200).json({
        success: true,
        message: 'car retrieved',
        data: car
    })
};

exports.getCars = async (req, res) => {
    const cars = await Car.find();

    res.status(200).json({
        success: true,
        results: cars.length,
        data: cars
    })
};

exports.updateCar = async (req, res, next) => {
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
        res.status(404).json({
            success: false,
            message: 'car could not be found.'
        });
        return next(new ErrorHandler('car could not be found', 404));
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'car registry successfully updated.',
        data: car
    })
};

exports.deleteCar = async (req, res) => {
    let car = undefined
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

    await Car.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'car removed from registry.'
    })
};

exports.registerCar = async (req, res, next) => {
    const body = req.body;
    if (body === undefined){
        res.status(500).end();
    }
    try {
        const car = await Car.create(body);
        res.status(200).json({
            success: true,
            message: 'car registered',
            data: car
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err
        })
        next();
    }
};
