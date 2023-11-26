const express = require('express');
const Actor = require('../models/actor');

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let actor = new Actor({
        name:name, lastName:lastName
    });
    actor.save().then(obj => res.status(200).json({
        message:res.__('actors.create.ok'),
        id:obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('actors.create.wrong'),
        obj:ex
    }));
}

function list(req, res, next) {
    Actor.find().then(objs => res.status(200).json({
        message:res.__('actors.list.ok'),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__('actors.list.wrong'),
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        message:res.__('actors.index.ok',{ actorId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('actors.index.wrong',{ actorId: id }),
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let actor = new Object({
        _name:name, _lastName:lastName
    });
    Actor.findOneAndUpdate({"_id":id}, actor, {new:true})
            .then(obj => res.status(200).json({
                message:res.__('actors.replace.ok',{ actorId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('actors.replace.wrong',{ actorId: id }),
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let actor = new Object();
    if(name) actor._name = name;
    if(lastName) actor._lastName = lastName;
    Actor.findOneAndUpdate({"_id":id}, actor)
            .then(obj => res.status(200).json({
                message:res.__('actors.update.ok',{ actorId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('actors.update.wrong',{ actorId: id }),
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__('actors.destroy.ok',{ actorId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('actors.destroy.wrong',{ actorId: id }),
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};