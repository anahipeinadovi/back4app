const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    let salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name:name, lastName:lastName, email:email, password:passwordHash, salt:salt
    }); 
    user.save().then(obj => res.status(200).json({
        message:res.__('users.create.ok'),
        id:obj._id,
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('users.create.wrong'),
        obj:ex
    }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
        message:res.__('users.list.ok'),
        obj:objs
    })).catch(ex => res.status(500).json({
        message:res.__('users.list.wrong'),
        obj:ex
    }));
}

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        message:res.__('users.index.ok',{ userId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('users.index.wrong',{ userId: id }),
        obj:ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";
    let user = new Object({
        _name:name, _lastName:lastName, _email:email, _password:password
    });
    User.findOneAndUpdate({"_id":id}, user, {new:true})
            .then(obj => res.status(200).json({
                message:res.__('users.replace.ok',{ userId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('users.replace.wrong',{ userId: id }),
                obj:ex
            }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let user = new Object();
    if(name) user._name = name;
    if(lastName) user._lastName = lastName;
    if(email) user._email = email;
    if(password) user._password = password;
    User.findOneAndUpdate({"_id":id}, user)
            .then(obj => res.status(200).json({
                message:res.__('users.update.ok',{ userId: id }),
                obj:obj
            })).catch(ex => res.status(500).json({
                message:res.__('users.update.wrong',{ userId: id }),
                obj:ex
            }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message:res.__('users.destroy.ok',{ userId: id }),
        obj:obj
    })).catch(ex => res.status(500).json({
        message:res.__('users.destroy.wrong',{ userId: id }),
        obj:ex
    }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
