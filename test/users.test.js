const supertest = require('supertest');

const app = require('../app');

describe("Probar users", () => {
    it ("Deberia de postear un usuario", (done) => {
        supertest(app).post('/users')
        .send({"name":"Peso", "lastName":"Pluma","email":"pesopluma@gmail.com","password":"abcd1234"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                userId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar Users", () => {
    it ("Deberia de obtener un usuario", (done) => {
        supertest(app).get(`/users/${userId}`)
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

describe("Probar Users", () => {
    it ("Deberia de obtener una lista de usuarios", (done) => {
        supertest(app).get('/users')
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

describe("Probar Users", () => {
    it ("Deberia de modificar un atributo del usuario", (done) => {
        supertest(app).put(`/users/${userId}`)
        .send({"name":"Gabriel"})
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

describe("Probar Users", () => {
    it ("Deberia de actualizar un usuario", (done) => {
        supertest(app).patch(`/users/${userId}`)
        .send({"email":"doblep@gmail.com"})
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

describe("Probar Users", () => {
    it ("Deberia de eliminar un usuario", (done) => {
        supertest(app).delete(`/users/${userId}`)
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