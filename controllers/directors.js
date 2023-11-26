const express = require('express');
const Director = require('../models/director');

function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    let director = new Director({
        name:name, 
        lastName:lastName
    });
    director.save().then(obj => res.status(200).json({
        message:res.__('directors.create.ok'), 
        id : obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('directors.create.wrong'),
        obj:ex
    }));
}

function list(req, res, next) {
    let page = req.params.page ? req.params.page: 1;
    const options = {page:page, limit:10};
    Director.paginate({}, options).then(objs => res.status(200).json({
        msg:res.__('directors.list.ok'),
        obj:objs
    })).catch(ex => res.status(500).json({
        msg:res.__('directors.list.wrong'),
        obj:ex
    }));
}
function index(req, res, next){
    const id = req.params.id;
    Director.findOne({"_id":id}).then(obj => res.status(200).json({
        message:res.__('directors.index.ok',{ directorId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('directors.index.wrong',{ directorId: id }),
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let director = new Object({
        _name:name, _lastName:lastName
    });
    Director.findOneAndUpdate({"_id":id}, director, {new:true})
            .then(obj => res.status(200).json({
                message:res.__('directors.replace.ok',{ directorId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('directors.replace.wrong',{ directorId: id }),
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let director = new Object();
    if(name) director._name = name;
    if(lastName) director._lastName = lastName;
    Director.findOneAndUpdate({"_id":id}, director)
            .then(obj => res.status(200).json({
                message:res.__('directors.update.ok',{ directorId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('directors.update.wrong',{ directorId: id }),
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Director.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__('directors.destroy.ok',{ directorId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('directors.destroy.wrong',{ directorId: id }),
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};

















