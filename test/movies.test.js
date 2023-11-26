const supertest = require('supertest');

const app = require('../app');


describe("Probar movies", () => {
    it ("Deberia de crear una pelicula", (done) => {
        supertest(app).post('/movies')
        .send({"title":"La forma del agua", "directorId":"656170aab33ca2a672bd92f1", "genreId":"65403daa4eb51fa084b58a01", "actorIds":"6540765b39b8e68c7f1a7846"})
        .expect(200)
        .end(function(err, res){
            if(err){
                done(err);
            } else {
                movieId = res.body.id;
                done();
            };
        })
    });

})

describe("Probar movies", () => {
    it ("Deberia de obtener una pelicula", (done) => {
        supertest(app).get(`/movies/${movieId}`)
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

describe("Probar movies", () => {
    it ("Deberia de obtener una lista de peliculas", (done) => {
        supertest(app).get('/movies')
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

describe("Probar movies", () => {
    it ("Deberia de modificar un atributo de una pelicula", (done) => {
        supertest(app).put(`/movies/${movieId}`)
        .send({"title":"La forma del agua 2"})
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

describe("Probar movies", () => {
    it ("Deberia de actualizar la pelicula", (done) => {
        supertest(app).patch(`/movies/${movieId}`)
        .send({"title":"La forma extraña del agua"})
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

describe("Probar movies", () => {
    it ("Deberia de eliminar una pelicula", (done) => {
        supertest(app).delete(`/movies/${movieId}`)
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