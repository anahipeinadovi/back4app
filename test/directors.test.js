const supertest = require('supertest');

const app = require('../app');

describe("Probar directors", () => {
    it ("Deberia de postear un director", (done) => {
        supertest(app).post('/directors')
        .send({"name":"Alfonso", "lastName":"Quaron"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                directorId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar directors", () => {
    it ("Deberia de obtener un director", (done) => {
        supertest(app).get(`/directors/${directorId}`)
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

describe("Probar directors", () => {
    it ("Deberia de obtener una lista de director", (done) => {
        supertest(app).get('/directors/list')
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

describe("Probar directors", () => {
    it ("Deberia de modificar un atributo del director", (done) => {
        supertest(app).put(`/directors/${directorId}`)
        .send({"name":"Alfonso Alejandro"})
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

describe("Probar directors", () => {
    it ("Deberia de actualizar el director", (done) => {
        supertest(app).patch(`/directors/${directorId}`)
        .send({"name":"Alfonso Alejandro", "lastName":"Quaron Orozco"})
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

describe("Probar directors", () => {
    it ("Deberia de eliminar el director", (done) => {
        supertest(app).delete(`/directors/${directorId}`)
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