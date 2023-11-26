const supertest = require('supertest');

const app = require('../app');

describe("Probar Bookings", () => {
    it ("Deberia de postear una reserva", (done) => {
        supertest(app).post('/bookings')
        .send({"date":"2023-04-26", "memberId":"65416ce389bb34dac5bf564a","copyId":"6561884b1179e0905ccd65dc"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                bookingId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar Bookings", () => {
    it ("Deberia de obtener una reserva", (done) => {
        supertest(app).get(`/bookings/${bookingId}`)
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        })
    })
})

describe("Probar Bookings", () => {
    it ("Deberia de obtener una lista de reservas", (done) => {
        supertest(app).get('/bookings')
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        })
    })
})

describe("Probar Bookings", () => {
    it ("Deberia de modificar un atributo de una reserva", (done) => {
        supertest(app).put(`/bookings/${bookingId}`)
        .send({"memberId":"65413e69b347458d71ee6a86"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        })
    })
})

describe("Probar Bookings", () => {
    it ("Deberia de actualizar la reserva", (done) => {
        supertest(app).patch(`/bookings/${bookingId}`)
        .send({"date":"2023-11-07"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        })
    })
})

describe("Probar Bookings", () => {
    it ("Deberia de eliminar la reserva", (done) => {
        supertest(app).delete(`/bookings/${bookingId}`)
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                done();
            };
        })
    })
})