const express = require('express');
const {Director} = require('../db');


function create(req,res,next){
    //res.send('directors create');
    const name = req.body.name;
    const lastName = req.body.lastName;

    Director.create({
      name:name,
      lastName:lastName

    }).then(object => res.json(object))
    .catch(err => res.send(err));
    //object que me va a confirmar qe se insertó en la base de datos 
}


function list(req,res,next){
    //res.send('directors list');
    Director.findAll({include: ['movies']})
    .then(objects => res.json(objects))
    .catch(err => res.send(err));
    
}

//solo hace un replace 
function replace(req,res,next){
    //res.send('directors replace'); parametros por el header y por el body 
    //vamos a cachar el id 
    const id = req.params.id;
    //buscar por llave primaria a mi director 
    Director.findByPk(id)
    .then(object =>{
        const name = req.body.name ? req.body.name:"";
        const lastName = req.body.lastName ? req.body.lastName : "";
        object.update({
            //objeto que contiene los valores o atributos que le queremos pasar 
            name : name,
            lastName: lastName
        }).then(obj => res.json(obj))
        .catch(err => res.send(err));
        //callback help es una llamada del callback al callback al callback
    })
    .catch(err => res.send(err));


}

function update(req,res,next){
    //res.send('directors update');
    //1 id 
    const id = req.params.id;
    //2. direector
    Director.findByPk(id).then(object =>{
        const name = req.body.name ? req.body.name: object.name;
        const lastName = req.body.lastName ? req.body.lastName: object.lastName;
        object.update({name: name,lastName:lastName})
        .then(obj => res.json(obj))
        .catch(err => res.send(err));

    }).catch(err => res.send(err));
}


function destroy(req,res,next){
    //res.send('directors destroy');
    const id = req.params.id;
    Director.destroy({where: {id:id}})
    .then(object => res.json(object))
    .catch(err => res.send(err));


}

// buscar un elemento y mostrarlo 
function index(req,res,next){
    //res.send('directors index');
    const id = req.params.id;
    Director.findByPk(id)
    .then(object => res.json(object))
    .catch(err => res.send(err));
}







module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};