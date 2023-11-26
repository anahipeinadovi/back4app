const supertest = require('supertest');

const app = require('../app');

describe("Probar Members", () => {
    it ("Deberia de postear un member", (done) => {
        supertest(app).post('/members')
        .send({
            "name":"Anahi",
            "lastName": "Peinado",
            "phone":"6271432404",
            "street":"Corregidora",
            "number":"3",
            "zip":33800,
            "city":"Parral",
            "state":"Chihuahua",
            "country":"Mexico"
            })
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                memberId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar members", () => {
    it ("Deberia de obtener un member", (done) => {
        supertest(app).get(`/members/${memberId}`)
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

describe("Probar members", () => {
    it ("Deberia de obtener una lista de member", (done) => {
        supertest(app).get('/members')
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

describe("Probar members", () => {
    it ("Deberia de modificar un atributo del member", (done) => {
        supertest(app).put(`/members/${memberId}`)
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

describe("Probar members", () => {
    it ("Deberia de actualizar el member", (done) => {
        supertest(app).patch(`/members/${memberId}`)
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




describe("Probar members", () => {
    it ("Deberia de eliminar el member", (done) => {
        supertest(app).delete(`/members/${memberId}`)
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