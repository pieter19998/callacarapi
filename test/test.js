const chai = require('chai');
const app = require('../app');
const chaiHttp = require('chai-http');
const server = require('../app');




const History = require('../models/history');
const Order = require('../models/order');
const ChargingFacility = require('../models/chargingfacility');
const ParkingFacility = require('../models/parkingfacility');
const Car = require('../models/car');
const Payment = require('../models/payment');



//------------------------
//SETTING UP MOCK DATA
//------------------------
var history1 = new History({
    from : "1234 Brabant Drive",
    to : "4321 Dordrecht",
    depaturetime : Date.now(),
    arrivaltime : Date.now() + 10,
    price : "100",
    car : '6058b02b36f37946d82734b3'
});




chai.should();
chai.use(chaiHttp);
describe('====COMMON TESTS====', () => {
    it('invalid route should throw internal server error', (done) => {
        chai.request(server)
            .get("/api/v1/nonexistenturi")
            .end((err, res) => {
               res.should.have.status(500);
               res.should.not.have.status(200);
               done();
            });
    })
});

describe('====CAR TESTS====', () => {




    //test get all cars
        it('It should retrieve all cars', (done) => {
            chai.request(server)
                .get("/api/v1/cars")
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.be.a('array');
                    done();
                })
        });


    //test get car by id
    it('should retrieve a car', (done) => {
        //chai.request('http://localhost:3000')
        chai.request(server)
            .get('/api/v1/car/6058b02b36f37946d82734b3').end((err, res) => {
            res.should.have.status(404);
            done();

        })
    });

    it('can register a car', (done) => {
        const car = {
            brand: "Alset",
            type: "Hybrid",
            owner: "PARKING ENTERPRISES"
        };
        chai.request(server)
            .post("/api/v1/car/register")
            .send(car)
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.contain.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('data');
            done();
            });
    });

});

describe('====MOCK TESTS====', () => {
   // it('can retrieve specific history', (done) => {
   //     chai.request(server)
   //         .get('/api/v1/mock/history/6058b02b36f37946d82734b4')
   //         .end((err, res) => {
   //             res.should.have.status(200);
   //             //res.body.should.contain.a('object');
   //             res.body.should.have.property('success');
   //             res.body.should.have.property('message');
   //             res.body.should.have.property('data');
   //             done();
   //         })
   // });
    it('can retrieve all histories', (done) => {
        chai.request(server)
            .get('/api/v1/mock/histories')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('success');
               // res.body.should.contain.a('array');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve specific order', (done) => {
        chai.request(server)
            .get('/api/v1/mock/order/6058b02b36f37946d82734b4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.contain.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve charging facility', (done) => {
        chai.request(server)
            .get('/api/v1/mock/chargingfacility/6058b02b36f37946d82734b4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.contain.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve all charging facilities', (done) => {
        chai.request(server)
            .get('/api/v1/mock/chargingfacilities')
            .end((err, res) => {
                res.should.have.status(200);
             //   res.body.should.contain.a('array');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve all payments', (done) => {
        chai.request(server)
            .get('/api/v1/mock/payments')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.contain.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve parking facility', (done) => {
        chai.request(server)
            .get('/api/v1/mock/parkingfacility/6058b02b36f37946d82734b4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.contain.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    });
    it('can retrieve specific payment', (done) => {
        chai.request(server)
            .get('/api/v1/mock/payment/6058b02b36f37946d82734b4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.contain.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            })
    })

});

