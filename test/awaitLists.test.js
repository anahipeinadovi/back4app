const supertest = require('supertest');

const app = require('../app');

describe("Probar awaitlists", () => {
    it ("Deberia de postear una lista de espera", (done) => {
        supertest(app).post('/awaitLists')
        .send({"memberId":"65416ce389bb34dac5bf564a", "movieId":"65618274db998b52aa2c4df9"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                awaitListId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar awaitLists", () => {
    it ("Deberia de obtener una lista de espera", (done) => {
        supertest(app).get(`/awaitLists/${awaitListId}`)
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

describe("Probar awaitLists", () => {
    it ("Deberia de obtener una lista de la lista de espera", (done) => {
        supertest(app).get('/awaitLists')
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

describe("Probar awaitLists", () => {
    it ("Deberia de modificar un atributo del una lista de espera ", (done) => {
        supertest(app).put(`/awaitLists/${awaitListId}`)
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

describe("Probar awaitLists", () => {
    it ("Deberia de actualizar una lista de espera", (done) => {
        supertest(app).patch(`/awaitLists/${awaitListId}`)
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

describe("Probar awaitLists", () => {
    it ("Deberia de eliminar una lista de espera", (done) => {
        supertest(app).delete(`/awaitLists/${awaitListId}`)
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