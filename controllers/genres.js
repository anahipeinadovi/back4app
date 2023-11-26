const express = require('express');
const Genre = require('../models/genre');

function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;
    let genre = new Genre({
        description:description, status:status
    });
    genre.save().then(obj => res.status(200).json({
        message:res.__('genres.create.ok'),
        id:obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('genres.create.wrong'),
        obj:ex
    }));
}

function list(req, res, next) {
    Genre.find().then(objs => res.status(200).json({
        message:res.__('genres.list.ok'),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__('genres.list.wrong'),
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        message:res.__('genres.index.ok',{ genreId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('genres.index.wrong',{ genreId: id }),
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";
    let status = req.body.status ? req.body.status : "";
    let genre = new Object({
        _description:description, _status:status
    });
    Genre.findOneAndUpdate({"_id":id}, genre, {new:true})
            .then(obj => res.status(200).json({
                message:res.__('genres.replace.ok',{ genreId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('genres.replace.wrong',{ genreId: id }),
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let description = req.body.description;
    let status = req.body.status;
    let genre = new Object();
    if(description) genre._description = description;
    if(status) genre._status = status;
    Genre.findOneAndUpdate({"_id":id}, genre)
            .then(obj => res.status(200).json({
                message:res.__('genres.update.ok',{ genreId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('genres.update.wrong',{ genreId: id }),
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__('genres.destroy.ok',{ genreId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('genres.destroy.wrong',{ genreId: id }),
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};