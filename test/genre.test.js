const supertest = require('supertest');

const app = require('../app');

describe("Probar genres", () => {
    it ("Deberia de postear un genero", (done) => {
        supertest(app).post('/genres')
        .send({"description":"Melancolico", "status":10})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                genreId = res.body.id;
                done();
            };
        })
    })
})

describe("Probar genres", () => {
    it ("Deberia de obtener un genero", (done) => {
        supertest(app).get(`/genres/${genreId}`)
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

describe("Probar genres", () => {
    it ("Deberia de obtener una lista de generos", (done) => {
        supertest(app).get('/genres')
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

describe("Probar genres", () => {
    it ("Deberia de modificar un atributo de un genero", (done) => {
        supertest(app).put(`/genres/${genreId}`)
        .send({"status":"40"})
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

describe("Probar genres", () => {
    it ("Deberia de actualizar el genero", (done) => {
        supertest(app).patch(`/genres/${genreId}`)
        .send({"description":"Melodrama", "status":55})
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

describe("Probar genres", () => {
    it ("Deberia de eliminar el genero", (done) => {
        supertest(app).delete(`/genres/${genreId}`)
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