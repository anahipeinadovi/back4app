//nombredel controlador.test.js
const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticación",()=>{
    it("Deberia obtener un login con un user y un pass ok",(done)=>{
        supertest(app).post("/login")
        .send({"email":"","password":""})
        .expect(200)
        .end(function(err,res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    })
});