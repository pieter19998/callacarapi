const express = require('express');
const router = express.Router();

//importing callers controller methods => add all imports here
const {getCar, getCars, registerCar, updateCar, deleteCar} = require('../controllers/carscontroller');
//route imports
router.route('/cars').get(getCars);
router.route('/car/:id').get(getCar);
router.route('/car/register').post(registerCar);

router.route('/car/:id').put(updateCar).delete(deleteCar);

//todo: add car statistics via aggregation


module.exports = router; // export router for main server use
