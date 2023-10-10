const express = require('express');
const {Actor} = require('../db');


function create(req,res,next){
    //res.send('Actors create');
    const name =req.body.name;
    const lastName = req.body.lastName;

    Actor.create({
        name:name,
        lastName:lastName    
    })
    .then(object => res.json(object))
    .catch(err => res.send(err))

}

function list(req,res,next){
    //res.send('Actors list');
    Actor.findAll()
    .then(objects => res.json(objects))
    .catch(err => res.send(err))
}

//buscar un elemento y mostrarlo 
function index(req,res,next){
    //res.send('Actors index');
    const id = req.params.id;
    Actor.findByPk(id)
    .then(object => res.json(object))
    .catch(err => res.send(err))
}

function replace(req,res,next){
    //res.send('Actors replace');
    const id = req.params.id;
    Actor.findByPk(id)
    .then(object =>{
        const name = req.body.name ? req.body.name: "";
        const lastName = req.body.lastName ? req.body.lastName : "";
        object.update({
            name : name,
            lastName:lastName
        }).then(obj => res.json(obj))
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
    

}
function update(req,res,next){
    //res.send('Actors update');
    const id = req.params.id;

    Actor.findByPk(id).then(object => {
        const name = req.body.name ? req.body.name: object.name;
        const lastName = req.body.lastName ? req.body.lastName : objectlastName;
        object.update({name:name,lastName:lastName})
        .then(obj => res.json(obj))
        .catch(err => res.send(err))


    })
    .catch(err => res.send(err));
}

function destroy(req,res,next){
    //res.send('Actors destroy');
    const id = req.params.id;
    Actor.destroy({where: {id:id}})
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