const express = require('express');


function create(req,res,next){
    res.send('directors create');
}

function list(req,res,next){
    res.send('directors list');
}

function index(req,res,next){
    res.send('directors index');
}

function replace(req,res,next){
    res.send('directors replace');
}
function update(req,res,next){
    res.send('directors update');
}

function destroy(req,res,next){
    res.send('directors destroy');
}


module.exports ={
    list,
    index,
    create,
    replace,
    update,
    destroy
};