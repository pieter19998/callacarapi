const express = require('express');
const router = express.Router();


const { getHistory, getHistories, getOrder, getOrders, submitPayment,chargeCar, getChargingFacilities, getChargingFacility, getParkingFacility, getParkingFacilities, getPayment, getPayments} = require('../controllers/mockcontroller');
//route imports
router.route('/mock/history/:id').get(getHistory);
router.route('/mock/histories').get(getHistories);
router.route('/mock/order/:id').get(getOrder);
router.route('/mock/orders').get(getOrders);
router.route('/mock/payment/submit/:id').post(submitPayment);
router.route('/mock/chargingfacility/chargecar/:id').post(chargeCar); //param1 - id of the car to charge
router.route('/mock/chargingfacility/:id').get(getChargingFacility);
router.route('/mock/chargingfacilities').get(getChargingFacilities);
router.route('/mock/parkingfacility/:id').get(getParkingFacility);
router.route('/mock/parkingfacilities').get(getParkingFacilities);
router.route('/mock/payment/:id').get(getPayment);
router.route('/mock/payments').get(getPayments);





module.exports = router; // export router for main server use

