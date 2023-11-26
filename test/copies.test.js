const supertest = require('supertest');

const app = require('../app');

describe("Probar Copies", () => {
    it ("Deberia de postear una copia", (done) => {
        supertest(app).post('/copies')
        .send({"number":"10", "format":"VHS","movieId":"65618274db998b52aa2c4df9","status":"AVAILABLE"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                copyId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar Copies", () => {
    it ("Deberia de obtener una copia", (done) => {
        supertest(app).get(`/copies/${copyId}`)
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

describe("Probar Copies", () => {
    it ("Deberia de obtener una lista de copias", (done) => {
        supertest(app).get('/copies')
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

describe("Probar Copies", () => {
    it ("Deberia de modificar un atributo de una copia", (done) => {
        supertest(app).put(`/copies/${copyId}`)
        .send({"status":"RENTED"})
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

describe("Probar Copies", () => {
    it ("Deberia de actualizar una copia", (done) => {
        supertest(app).patch(`/copies/${copyId}`)
        .send({"number":"10", "format":"BLUE_RAY","movieId":"65618274db998b52aa2c4df9","status":"AVAILABLE"})
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

describe("Probar Copies", () => {
    it ("Deberia de eliminar una copia", (done) => {
        supertest(app).delete(`/copies/${copyId}`)
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