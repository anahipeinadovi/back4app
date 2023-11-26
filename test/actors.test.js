const supertest = require('supertest');

const app = require('../app');

describe("Probar actors", () => {
    it ("Deberia de postear un actor", (done) => {
        supertest(app).post('/actors')
        .send({"name":"Angelique", "lastName":"Boyer"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                actorId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar actors", () => {
    it ("Deberia de obtener un actor", (done) => {
        supertest(app).get(`/actors/${actorId}`)
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

describe("Probar actors", () => {
    it ("Deberia de obtener una lista de actores", (done) => {
        supertest(app).get('/actors/list')
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

describe("Probar actors", () => {
    it ("Deberia de modificar un atributo del actor", (done) => {
        supertest(app).put(`/directors/${actorId}`)
        .send({"name":"Samuel"})
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

describe("Probar actors", () => {
    it ("Deberia de actualizar el actor", (done) => {
        supertest(app).patch(`/actors/${actorId}`)
        .send({"name":"Samael", "lastName":"Tarango"})
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

describe("Probar actor", () => {
    it ("Deberia de eliminar el actor", (done) => {
        supertest(app).delete(`/actors/${actorId}`)
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