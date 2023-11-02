const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


function home (req, res, next) {
    res.render('index', { title: 'Express' });
}

function login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const JwtKey = "c7f6663f925ce99625563a31b3d33adb";
    User.findOne({"_email":email})
    .then(user => {
        if (user){
            bcrypt.hash(password,user.salt,(err,hash)=>{//cadena que queremos encriptar,
                if(err){
                    //regresar 403 si estoy tratando de autenticar y no puedo autenticar el 403 es de acceso denegado 
                    res.status(403).json({
                        msg:"Usuario y contraseña incorrecto",
                        obj:null
                    });
                }
                if(hash == user.password){
                    res.status(200).json({
                        msg:"Login ok",
                        obj:jwt.sign({data:user.data,exp:Math.floor(Date.now()/1000)+60,JwtKey}) //la funcion sign nos ayuda a armar un token jwt (info,)
                        //stateless 
                    });
                }else{
                    res.status(403).json({
                        msg:"Usuario y contraseña incorrecto",
                        obj:null
                    });
                }
            }); 
        }else{
            res.status(403).json({
                msg:"Usuario y contraseña incorrecto",
                obj:null
            });
        }
    }).catch(ex => res.status(403).json({
        msg: "Usuario y contraseña incorrecto",
        obj:null
    }));
}

module.exports = {home, login}
